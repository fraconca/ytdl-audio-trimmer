# 🎵 YouTube MP3 Downloader & Audio Trimmer

Este repositório contém um simples **YouTube MP3 Downloader** com uma funcionalidade adicional de **corte (trim)** de áudio, tudo implementado em **Node.js**. Baixe músicas de YouTube e extraia trechos específicos de forma rápida e prática.

---

## 🚀 Descrição

Este projeto permite baixar áudio de vídeos do YouTube diretamente para MP3 e cortar trechos específicos do arquivo baixado, oferecendo a flexibilidade de determinar a parte exata da música ou áudio que você deseja.

- **Baixar áudios do YouTube** em alta qualidade.
- **Converter o áudio** para o formato MP3.
- **Cortar** o áudio a partir de um tempo inicial e uma duração especificados.
- **Automatizar** o processo com uma única execução.

Este projeto foi desenvolvido com a biblioteca [ytdl-core](https://github.com/fent/node-ytdl-core) para download de vídeos e [fluent-ffmpeg](https://github.com/fluent-ffmpeg/node-fluent-ffmpeg) para manipulação e corte de áudio.

---

## 🛠️ Funcionalidades

- **Download de MP3** de vídeos do YouTube.
- **Corte de áudio** com base em tempo configurado.
- **Conversão de tempos (HH:MM:SS)** para segundos de forma automática.
- **Nomeação dinâmica** do arquivo de áudio com base na data e um número aleatório.

---

## 📥 Instalação

### Pré-requisitos

- **Node.js** versão 14 ou superior.  
- **FFmpeg** instalado no seu sistema [Veja como instalar FFmpeg aqui](https://ffmpeg.org/download.html).

### Passos de instalação

1. Clone o repositório para seu ambiente local:
    ```bash
    git clone https://github.com/seu-usuario/youtube-mp3-downloader-trimmer.git
    ```

2. Acesse a pasta do projeto:
    ```bash
    cd youtube-mp3-downloader-trimmer
    ```

3. Instale as dependências necessárias:
    ```bash
    npm install
    ```

4. Verifique se o FFmpeg está instalado corretamente:
    ```bash
    ffmpeg -version
    ```
> Caso não tenha o FFmpeg instalado, siga as instruções no link acima.

---

## O que cada script faz?

1. Baixa um arquivo completo de áudio de uma URL do YouTube.

2. Através da função generateFilename() o script gera um nome único do arquivo usando Date, TimeStamp e converte a data como string no formato ISO. Remove caracteres especiais, mantém apenas ANO, MÊS, DIA, HORA, MINUTO, SEGUNDO e adiciona um número aleatório de 4 dígitos. Nomeia o arquivo "audio_${timestamp}_${randomNum}.mp3" e salva na pasta onde o script foi executado.

3. Usa a função ffmpeg() e no método .on define um início e fim do corte na função "trimAudio()" contado o tempo total em segundos e cria um novo arquivo editado com o corte de tempo estipulado e adiciona no final do arquivo a expresssão "_trimmed" para identificar o áudio cortado.

4. No final a execução, você terá dois arquivos: um original completo e outro cortado. 

---

## 📝 Como Usar

### Baixar áudio e cortar

Para iniciar o processo de download e corte de áudio, utilize o seguinte comando:

    ```bash
    node ytdownload --start 00:00:45 --end 00:27:24 --url "https://www.youtube.com/watch?v=3q3U9HpPHmY"
    ```

O script precisa receber argumentos corretos através de 3 flags para poder realizar o download e o corte automaticamente.
    
- --start define o tempo inicial do corte no formato HH:MM:SS. Se o corte dor aos 3 segundos, informe todos os zeros "00:00:03" para que a função converta corretamente o tempo informado em segundos.

- --end define o tempo final do corte no mesmo formato HH:MM:SS.

- --url define a URL do vídeo do YouTube a ser baixado. Detalhe: URL na flag é em minúsculo (url), ok?! 

> IMPORTANTE: Certifique-se de colocar a URL entre aspas (" ") para evitar erros no terminal.

### Apenas baixar o áudio sem cortar

A única exigência obrigatória é a --url. Se o argumento não for passado, o script avisa que foi baixado sem corte e encerra.

- Se ``--start`` e ``--end`` forem passados, o áudio será cortado.
- Se ``--start`` e ``--end`` não forem passados, o áudio será baixado normalmente sem cortes.

---

## 🔧 Contribuições

Contribuições são bem-vindas!

Se você encontrou um bug ou tem uma ideia para melhorar o projeto, sinta-se à vontade para abrir uma issue ou pull request.

### ♥️ Esse código te ajudou?

**Me adicione no Linkedin** ou me pague um café via PIX (te passo a chave no Inbox)!
https://br.linkedin.com/in/flavio-conca

**Me siga no Twitter** também: [@fraconca](https://x.com/FraConca)

---

#### 📜 Disclaimer

Este projeto está licenciado sob a MIT License - veja o arquivo LICENSE para mais detalhes. O link do YouTube utilizado possui uma faixa que está em domínio público, logo, não há infrações dos Direitos Autorais e pode ser utilizada para fins educativos. O arquivo que será baixado pertence ao YouTube Audio Library e é da autoria de W. A. Mozart, Symphony No.38 in D major.

---

#### 🎯 Links Úteis

[Site ofiical FFmpeg](https://ffmpeg.org/)
[Documentação ytdl-core](https://github.com/fent/node-ytdl-core)