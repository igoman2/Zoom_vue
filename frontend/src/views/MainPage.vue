<template>
  <v-container>
    <v-row>Joom</v-row>
    <div>
      <v-form v-model="valid" ref="form" lazy-validation action="/">
        <v-container>
          <v-row>
            <v-col cols="12" md="4">
              <v-text-field
                v-model="roomName"
                :counter="10"
                label="First name"
                required
              ></v-text-field>
            </v-col>

            <!-- <v-col cols="12" md="4">
              <v-text-field
                v-model="lastname"
                :rules="nameRules"
                :counter="10"
                label="Last name"
                required
              ></v-text-field>
            </v-col>

            <v-col cols="12" md="4">
              <v-text-field
                v-model="email"
                :rules="emailRules"
                label="E-mail"
                required
              ></v-text-field>
            </v-col> -->
          </v-row>
        </v-container>
      </v-form>
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
      <v-btn @click="submit"> submit </v-btn>
      <option ref="cameraOption"></option>
      <Message />
    </div>
  </v-container>
</template>

<script>
export default {
  name: "MainPage",
  components: {
    Message: () => import("@/views/components/Message"),
  },

  data: () => ({
    roomName: null,
    valid: true,
    myStream: null,
    peerStream: null,
    myPeerConnection: null,
    hasStream: false,
  }),

  computed: {},

  created: async function () {},

  mounted: async function () {
    this.$nextTick(() => {
      this.$socket.on("welcome", async () => {
        console.log("welcome");
        const offer = await this.myPeerConnection.createOffer();
        this.myPeerConnection.setLocalDescription(offer);
        console.log("sent the offer");
        this.$socket.emit("offer", offer, this.roomName);
      });
      this.$socket.on("offer", async (offer) => {
        console.log("received the offer");
        this.myPeerConnection.setRemoteDescription(offer);
        const answer = await this.myPeerConnection.createAnswer();
        this.myPeerConnection.setLocalDescription(answer);
        this.$socket.emit("answer", answer, this.roomName);
        console.log("sent the answer");
      });

      this.$socket.on("answer", (answer) => {
        console.log("received the offer");
        console.log("!");
        this.myPeerConnection.setRemoteDescription(answer);
      });

      this.$socket.on("ice", (ice) => {
        console.log("ice: " + JSON.stringify(ice));
        console.log(this.myPeerConnection);
        this.myPeerConnection.addIceCandidate(ice);
      });
    });
  },

  directives: {},

  methods: {
    checkSocket() {
      console.log("!");
    },
    async submit() {
      this.$refs.form.validate();
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
        this.myStream = await navigator.mediaDevices.getUserMedia(
          deviceId ? cameraConstraints : initialConstraints
        );
        this.hasStream = true;
        // console.log(this.$refs.video.srcObject.prop);
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
      console.log(this.myPeerConnection);
      this.myPeerConnection.addEventListener("icecandidate", this.handleIce);
      this.myPeerConnection.addEventListener("addstream", this.handleAddStream);
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
      console.log("sent candidate");
      // 브라우저 간 candidate을 왔다갔다 하면서 공유
      this.$socket.emit("ice", data.candidate, this.roomName);
    },
    handleAddStream(data) {
      this.peerStream = data.stream;
    },
  },
};
</script>

<style lang="scss"></style>
