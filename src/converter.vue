<template>
  <div>
    <h1>Hypergate Certificate Converter</h1>
    <h2>Certificate Input</h2>
    <el-upload
      action=""
      :on-change="convert"
      :auto-upload="false"
      single
      :limit="1">
    <el-button size="small" type="primary">Select *.pem Certificate</el-button>
      <div slot="tip" class="el-upload__tip">*.pem file of your certificate</div>
    </el-upload>
    <p> - or - </p>
    <el-input
      ref="text" 
      type="textarea"
      :rows="10"
      v-model="rawCertificate">
    </el-input>
    <br />
    <br />
    <el-button @click="convert()">Convert</el-button>

    <h2>Converted Certificate</h2>
    <el-input
      ref="text" 
      type="textarea"
      readonly
      :rows="10"
      v-model="convertedCertificate">
    </el-input>
    <br />
    <br />
    <el-button @click="copy()" :disabled="convertedCertificate.length === 0">Copy</el-button>
  </div>
</template>

<script>
import { Button, Message, Input, Upload } from 'element-ui'

export default {
    components: { 'el-button': Button, 'el-input': Input, 'el-upload': Upload },
    methods: {
        copy() {
          this.$refs.text.select();
          document.execCommand('copy');

          Message({
            message: 'Copied to your clipboard.',
            type: 'success'
          })
        },
        convertPem(inputCert) {
          let outputCert = inputCert

          // replace all linebreaks with spaces
          outputCert = inputCert.replace(/(?:\r\n|\r|\n)/g, ' ')

          return outputCert
        },
        convert (name, files) {
            // handle file changes
            if (!files || !files.length || files.length === 0) {
                this.convertedCertificate = this.convertPem(this.rawCertificate)
                Message({
                    message: 'Certificate converted.',
                    type: 'success'
                })

            } else {
                const certFile = files[0].raw
                const reader = new FileReader()

                reader.onload = (e) => {
                  let certificateContent = ''
                  let bytes = new Uint8Array(e.target.result)
                  let length = bytes.byteLength
                  
                  for (var i = 0; i < length; i++) {
                    certificateContent += String.fromCharCode(bytes[i])
                  }

                  this.convertedCertificate = this.convertPem(certificateContent)

                  Message({
                    message: 'Certificate converted.',
                    type: 'success'
                  })

                }

                reader.readAsArrayBuffer(certFile)
            }
        }
    },
    data () {
        return {
            files: [],
            isSaving: false,
            convertedCertificate: ''
        }
    }
}
</script>

<style lang="scss">
@import url('https://fonts.googleapis.com/css?family=Roboto+Mono');

* {
  font-family: 'Roboto Mono', monospace;
}
</style>
