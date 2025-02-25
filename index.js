const ytdl = require("@distube/ytdl-core");
const ffmpeg = require("fluent-ffmpeg");
const trimAudio = require("./modulo/trimaudio");

// Função para gerar nome único do arquivo
function generateFilename() {
    const now = new Date();
    const timestamp = now.toISOString().replace(/[-T:.Z]/g, "").slice(0, 14);
    const randomNum = Math.floor(Math.random() * 10000);
    return `audio_${timestamp}_${randomNum}.mp3`;
}

// Função para converter HH:MM:SS para segundos
function convertToSeconds(hhmmss) {
    const [hours, minutes, seconds] = hhmmss.split(':').map(Number);
    return hours * 3600 + minutes * 60 + seconds;
}

// Captura argumentos da linha de comando
const args = process.argv.slice(2);
const startFlagIndex = args.indexOf("--start");
const endFlagIndex = args.indexOf("--end");
const urlFlagIndex = args.indexOf("--url");

const startTime = startFlagIndex !== -1 ? args[startFlagIndex + 1] : null;
const endTime = endFlagIndex !== -1 ? args[endFlagIndex + 1] : null;
const videoUrl = urlFlagIndex !== -1 ? args[urlFlagIndex + 1] : null;

// Verifica se todos os argumentos foram fornecidos
if (!startTime || !endTime || !videoUrl) {
    console.log("🛑 Argumentos inválidos! 🛑");
    console.log("📌 Uso correto:");
    console.log("node index.js --start HH:MM:SS --end HH:MM:SS --url <URL do YouTube>");
    process.exit(1);
}

// Converte tempos para segundos
const startSeconds = convertToSeconds(startTime);
const endSeconds = convertToSeconds(endTime);
const duration = endSeconds - startSeconds;

// Função para baixar áudio
async function downloadMP3(videoUrl) {
    if (!ytdl.validateURL(videoUrl)) {
        return console.log("🛑 URL inválida! 🛑");
    }

    const outputFilename = generateFilename();
    console.log(`🚧 Baixando áudio como: ${outputFilename}`);

    const audioStream = ytdl(videoUrl, { quality: "highestaudio" });

    return new Promise((resolve, reject) => {
        ffmpeg(audioStream)
            .audioBitrate(128)
            .toFormat("mp3")
            .save(outputFilename)
            .on("end", async () => {
                console.log(`✅ Download concluído: ${outputFilename} 🎶`);

                // ⚡ Após o download, corta automaticamente um trecho do áudio
                const trimmedFile = await trimAudio(outputFilename, startSeconds, duration);
                console.log(`🎉 Áudio cortado disponível em: ${trimmedFile} 🖖🏻`);

                resolve();
            })
            .on("error", reject);
    });
}

// Executa o download
downloadMP3(videoUrl);