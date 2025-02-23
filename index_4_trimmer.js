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

// Função para baixar áudio
async function downloadMP3(videoUrl) {
    if (!ytdl.validateURL(videoUrl)) {
        return console.log("URL inválida!");
    }

    const outputFilename = generateFilename();
    console.log(`Baixando áudio como: ${outputFilename}`);

    const audioStream = ytdl(videoUrl, { quality: "highestaudio" });

    return new Promise((resolve, reject) => {
        ffmpeg(audioStream)
            .audioBitrate(128)
            .toFormat("mp3")
            .save(outputFilename)
            .on("end", async () => {
                console.log(`Download concluído: ${outputFilename}`);

                // ⚡ Após o download, corta automaticamente um trecho do áudio entre 10 e 30 segundos.
                const trimmedFile = await trimAudio(outputFilename, 10, 30);
                console.log(`Áudio cortado disponível em: ${trimmedFile}`);

                resolve();
            })
            .on("error", reject);
    });
}

// Executa o download
downloadMP3("https://www.youtube.com/watch?v=Da4eikl5wfk");