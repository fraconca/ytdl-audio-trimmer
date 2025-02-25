const ffmpeg = require("fluent-ffmpeg");
const path = require("path");

// Função para cortar o áudio
function trimAudio(inputFile, startTime, duration, outputFile = null) {
    if (!outputFile) {
        const ext = path.extname(inputFile);
        const baseName = path.basename(inputFile, ext);
        outputFile = `${baseName}_trimmed${ext}`; // Exemplo: audio_20250223091432_1234_trimmed.mp3
    }

    console.log(`Cortando áudio: ${inputFile} -> ${outputFile} que será cortado com ${startTime}s e terá duração total de ${duration}s`);

    return new Promise((resolve, reject) => {
        ffmpeg(inputFile)
            .setStartTime(startTime) // Tempo de início (em segundos)
            .setDuration(duration) // Duração do trecho (em segundos)
            .output(outputFile)
            .on("end", () => {
                console.log(`Corte concluído: ${outputFile}`);
                resolve(outputFile);
            })
            .on("error", reject)
            .run();
    });
}

if (require.main === module) {
    const args = process.argv.slice(2);
    if (args.length < 3) {
        console.error("Uso: node trimaudio.js <arquivo> <início> <duração>");
        process.exit(1);
    }

    const [inputFile, startTime, duration] = args;
    trimAudio(inputFile, parseFloat(startTime), parseFloat(duration));
}

module.exports = trimAudio;