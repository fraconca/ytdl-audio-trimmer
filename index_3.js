const ytdl = require("@distube/ytdl-core");
const ffmpeg = require("fluent-ffmpeg");

// Função para gerar nome único do arquivo
function generateFilename() {
    const now = new Date();
    const timestamp = now
        .toISOString()
        .replace(/[-T:.Z]/g, "") // Remove caracteres especiais
        .slice(0, 14); // Mantém apenas ANO, MÊS, DIA, HORA, MINUTO, SEGUNDO
    const randomNum = Math.floor(Math.random() * 10000); // Número aleatório de 4 dígitos
    return `audio_${timestamp}_${randomNum}.mp3`;
}

// Função para baixar áudio em MP3
async function downloadMP3(videoUrl) {
    if (!ytdl.validateURL(videoUrl)) {
        return console.log("🛑 URL inválida!");
    }

    const outputFilename = generateFilename();
    console.log(`🚧 Baixando áudio como: ${outputFilename}`);

    const audioStream = ytdl(videoUrl, { quality: "highestaudio" });

    return new Promise((resolve, reject) => {
        ffmpeg(audioStream)
            .audioBitrate(128)
            .toFormat("mp3")
            .save(outputFilename)
            .on("end", () => {
                console.log(`✅ Download concluído: ${outputFilename} 🎶`);
                resolve();
            })
            .on("error", reject);
    });
}

// Executa o download
downloadMP3("https://www.youtube.com/watch?v=Da4eikl5wfk");