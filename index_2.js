const ytdl = require("@distube/ytdl-core");
const ffmpeg = require("fluent-ffmpeg");

// Função para baixar áudio em MP3
async function downloadMP3(videoUrl, outputFilename = "audio.mp3") {
    if (!ytdl.validateURL(videoUrl)) {
        return console.log("URL inválida!");
    }

    console.log("Baixando áudio...");
    const audioStream = ytdl(videoUrl, { quality: "highestaudio" });

    return new Promise((resolve, reject) => {
        ffmpeg(audioStream)
            .audioBitrate(128)
            .toFormat("mp3")
            .save(outputFilename)
            .on("end", () => {
                console.log(`Download concluído: ${outputFilename}`);
                resolve();
            })
            .on("error", reject);
    });
}

// Executa o download
downloadMP3("https://www.youtube.com/watch?v=Da4eikl5wfk");