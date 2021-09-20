<template>
  <v-container>
    <div>
      <video
        ref="video"
        :srcObject.prop="myStream"
        autoplay
        width="400"
        height="400"
      ></video>
      <video
        ref="video"
        :srcObject.prop="peerStream"
        autoplay
        width="400"
        height="400"
      ></video>
      <div>
        <h3>
          {{ roomName }}
        </h3>
      </div>
      <div>
        {{ roomCount }}
      </div>
      <v-col cols="6">
        <ul v-for="(item, index) in messages" :key="index">
          {{
            item
          }}
        </ul>
        <v-row no-gutters>
          <v-col cols="9" align="center">
            <v-text-field
              v-model="message"
              label="메세지를 입력하세요"
              required
              @keyup.enter="send()"
            ></v-text-field>
          </v-col>
          <v-col cols="3" align="bottom">
            <v-btn @click="send()"> Send </v-btn>
          </v-col>
        </v-row>
      </v-col>

      <option ref="cameraOption"></option>
    </div>
  </v-container>
</template>

<script>
export default {
  name: "VideoRoom",
  components: {},

  data: () => ({
    roomName: null,
    myStream: null,
    peerStream: null,
    myPeerConnection: null,
    hasStream: false,
    messages: [],
    message: "",
    roomCount: 0,
  }),

  computed: {},

  created: function () {
    this.init();
  },

  mounted: async function () {
    this.$nextTick(() => {
      this.submit();
      this.$socket.on("welcome", async (user, newCount) => {
        this.roomCount = newCount;
        this.addMessage(`${user} arrived!`);
        const offer = await this.myPeerConnection.createOffer();
        this.myPeerConnection.setLocalDescription(offer);
        this.$socket.emit("offer", offer, this.roomName);
      });
      this.$socket.on("offer", async (offer) => {
        this.myPeerConnection.setRemoteDescription(offer);
        const answer = await this.myPeerConnection.createAnswer();
        this.myPeerConnection.setLocalDescription(answer);
        this.$socket.emit("answer", answer, this.roomName);
      });

      this.$socket.on("answer", (answer) => {
        this.myPeerConnection.setRemoteDescription(answer);
      });

      this.$socket.on("ice", (ice) => {
        this.myPeerConnection.addIceCandidate(ice);
      });
      this.$socket.on("new_message", this.addMessage);
      this.$socket.on("bye", (left, newCount) => {
        this.roomCount = newCount;
        this.addMessage(`${left} left`);
      });
      this.$socket.on("room_change", (rooms) => {
        if (rooms.length === 0) {
          return;
        }
      });
    });
  },

  beforeDestroy: function () {
    console.log("destroyed");
  },
  directives: {},

  methods: {
    init() {
      this.roomName = this.$route.params.roomId;
    },
    checkSocket() {},
    async submit() {
      await this.initCall();
      this.$socket.emit("join_room", this.roomName);
    },
    async initCall() {
      await this.getMedia();
      this.makeConnection();
    },
    async getMedia(deviceId) {
      const initialConstraints = {
        audio: true,
        video: { facingMode: "user" },
      };
      const cameraConstraints = {
        audio: true,
        video: {
          deviceId: {
            exact: deviceId,
          },
        },
      };
      try {
        console.log("!!");
        console.log(navigator.mediaDevices);
        console.log(cameraConstraints);
        console.log(initialConstraints);
        this.myStream = await navigator.mediaDevices.getUserMedia(
          deviceId ? cameraConstraints : initialConstraints
        );
        this.hasStream = true;
        if (!deviceId) {
          await this.getCameras();
        }
      } catch (e) {
        console.log(e);
      }
    },
    makeConnection() {
      // P2P connection 생성 후 양쪽 브라우저의 마이크, 카메라  스트림을 넣어줌
      this.myPeerConnection = new RTCPeerConnection({
        iceServers: [
          {
            // 실제 서비스를 배포할땐 STUN서버를 구동해야 함
            //  *** STUN 서버: public address에 접근하기 위한 서버 ***
            // 아래는 테스트용
            urls: [
              "stun:stun.l.google.com:19302",
              "stun:stun1.l.google.com:19302",
              "stun:stun2.l.google.com:19302",
              "stun:stun3.l.google.com:19302",
              "stun:stun4.l.google.com:19302",
            ],
          },
        ],
      });
      this.myPeerConnection.addEventListener("icecandidate", this.handleIce);
      this.myPeerConnection.addEventListener("addstream", this.handleAddStream);
      console.log(this.myStream);
      this.myStream
        .getTracks()
        .forEach((track) =>
          this.myPeerConnection.addTrack(track, this.myStream)
        );
    },
    async getCameras() {
      try {
        const devices = await navigator.mediaDevices.enumerateDevices();
        const cameras = devices.filter(
          (device) => device.kind === "videoinput"
        );
        const currentCamera = this.myStream.getVideoTracks()[0];

        cameras.forEach((camera) => {
          this.$refs.cameraOption.value = camera.deviceId;
          this.$refs.cameraOption.innerText = camera.label;
          if (currentCamera.label === camera.label) {
            this.$refs.cameraOption.selected = true;
          }
          // camerasSelect.appendChild(option);
        });
      } catch (e) {
        console.log(e);
      }
    },
    handleIce(data) {
      // 브라우저 간 candidate을 왔다갔다 하면서 공유
      this.$socket.emit("ice", data.candidate, this.roomName);
    },
    handleAddStream(data) {
      this.peerStream = data.stream;
    },
    addMessage(value) {
      this.messages.push(value);
    },
    send() {
      this.$socket.emit("new_message", this.message, this.roomName, () => {
        this.addMessage(`You: ${this.message}`, () => {});
        this.message = "";
      });
    },
  },
};
</script>

<style lang="scss"></style>
