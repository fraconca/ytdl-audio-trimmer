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
    Caso não tenha o FFmpeg instalado, siga as instruções no link acima.

---

## O que cada script faz?

1. index.js baixa um arquivo de áudio de uma URL do YouTube e salva com o nome de audio.mp3.
2. 

## 📝 Como Usar

### Baixar Áudio e Cortar

1. **Baixar o áudio** e cortar de forma automática (conversão e corte ao mesmo tempo):

    Para iniciar o processo de download e corte, basta executar o script principal `index.js`:

    ```bash
    node index.js
    ```

    O script pedirá a URL do vídeo do YouTube e, em seguida, realizará o download e corte automaticamente com os parâmetros de tempo predefinidos.

### Corte Manual de Áudio

Se você preferir cortar um arquivo MP3 já baixado manualmente, use o arquivo `trimaudio.js`. Aqui está um exemplo de como rodá-lo diretamente:

```bash
node trimaudio.js <arquivo-audio> <hora-inicio> <hora-fim>
```

#### Disclaimer

O link do YouTube utilizado possui uma faixa que está em domínio público, logo, não há infrações dos Direitos Autorais e pode ser utilizada para fins educativos. O arquivo que será baixado pertence ao YouTube Audio Library e é da autoria de W. A. Mozart, Symphony No.38 in D major.