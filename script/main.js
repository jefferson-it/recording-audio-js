function SaveRecordingInChuck(env){
    this.push(env.data);
}

function SaveRecording(audio_elm, btn){
    const blob = new Blob(this, {
       type: "audio/mp3; codecs=opus"
    })
    const url = URL.createObjectURL(blob)

    audio_elm.src = url;

    if(audio_elm.src){
        btn.style.display = "inline"
        btn.addEventListener("click", (e)=>{
            const link = document.createElement("a")
            link.href = url;
            link.download = `audio-${Math.random().toString(16)}.mp3`
            
            link.click()
        })
    }
}

function Start(btn_start, btn_stop){
    if(this.state == "inactive"){
        // Start record/Iniciar gravação
        this?.start()
        // Change button's style
        // Muda os estilos dos botões 
        btn_start.style.display = "none"
        btn_stop.style.display = "inline"
    }
}

function Stop(btn_start, btn_stop){
    if(this.state != "inactive") {
        // Stop record/Parar gravação
        this?.stop()
        // Change button's style
        // Muda os estilos dos botões 
        btn_start.style.display = "inline"
        btn_stop.style.display = "none"
    }
}

async function main(){
    // Save blob date in chucks
    // Sava dados blob no array chuck
    const chucks = [];
    // DOM ELEMENT 
    // Elemento DOM
    const audio_display = document.querySelector("#audio-display");
    const start_btn = document.querySelector("#start");
    const stop_btn = document.querySelector("#stop");
    const down_btn = document.querySelector("#download");

    // Init recorder stream
    // Iniciando gravador
    const stream = await navigator.mediaDevices.getUserMedia({audio: true})
    const recorder = new MediaRecorder(stream);

    // Execute when data is available
    // Execute quando o dado estiver disponível
    recorder.ondataavailable = SaveRecordingInChuck.bind(chucks);
    // Execute when recorder is stopped
    // Execute quando a gravação for parada
    recorder.onstop = SaveRecording.bind(chucks, audio_display, down_btn);

    // Bind function start and stop
    start_btn.addEventListener("click", Start.bind(recorder, start_btn, stop_btn))
    stop_btn.addEventListener("click",  Stop.bind(recorder, start_btn, stop_btn))
}

/**
  *  @author Jefferson Silva de Souza - 
  *  
  *  github.com/jefferson-developer-it/
  *  
  *  Apesar de não ser comum usar esta estrutura em um código JavaScript
  *  Optei pois não queria usar uma promises e tratar com .then().catch().
  *  Então fiz uma função assíncrona principal, pois poderia tratar as promises usando o await.  
  *
  *  Although it is not common to use this structure in JavaScript code
  *  I chose because I didn't want to use a promises and deal with .then().catch().
  *  So I made an asynchronous main function, as I could handle promises using await.
  *
*/

main()