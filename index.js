const ytdl = require("@distube/ytdl-core");
const ffmpeg = require("fluent-ffmpeg");
const path = require("path");

// Função para baixar áudio em MP3
async function downloadMP3(videoUrl, outputFilename) {
    try {
        if (!ytdl.validateURL(videoUrl)) {
            console.log("🛑 URL inválida! 🛑");
            return;
        }

        console.log("🚧 Baixando áudio...");

        // Cria stream de entrada
        const audioStream = ytdl(videoUrl, { quality: "highestaudio" });
        // Qualidade pode ser "lowestaudio" ou "highestaudio".
        // Testar "lowestaudio" se o YouTube estiver bloqueando algumas qualidades de áudio. 

        // Caminho de saída
        const outputPath = path.join(__dirname, outputFilename);

        // Converte para MP3 com FFmpeg
        ffmpeg(audioStream)
            .audioBitrate(128) // Qualidade do áudio
            .toFormat("mp3")
            .save(outputPath)
            .on("end", () => console.log(`✅ Download concluído: ${outputPath} 🎶`))
            .on("error", (err) => console.error("Erro:", err));
    } catch (error) {
        console.error("🛑🛑🛑 Erro ao baixar o áudio:", error);
    }
}

// URL do vídeo e nome do arquivo de saída
const videoUrl = "https://www.youtube.com/watch?v=Da4eikl5wfk"; // Substitua pelo ID do vídeo
downloadMP3(videoUrl, "audio.mp3");