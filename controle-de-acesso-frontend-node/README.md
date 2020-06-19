# Luego Boilerplate

Versão atual: 2.0.0


## Características
- Compressão de imagens com o método `lossy compression`: `gulp-imagemin`: `gifsicle`, `jpegtran`, `optipng` and `svgo`

- Geração de spritesheet automatizada com `gulp-sprite-by-ext`.
Basta adicionar arquivos na seguinte pasta `assets/images/sprites`.
Serão gerados classes CSS com o nome e extenssão de cada imagem. Por exemplo, uma imagem com o nome `imagem.jpg` irá gerar uma classe CSS com a seguinte nomemclatura: `.jpg-imagem`

- `Shadow Files`, que é a geração automatica de arquivos com base em uma lista

- Build com fonte de dados Local e/ou Remota

- Componentização ES6, LESSCSS e HTML5

## Tecnologias
- Removendo a dependencia do jQuery e adicionando o Zepto como alternativa ao jQuery, quando necessário

- Removendo o SlickJS e adicionando o SwiperJS

## NPM scripts

- `npm run dev`: realiza o build com o ENV `DEV` e inicia um servidor com hot reload

- `npm run hom`: realiza o build com o ENV `HOM` e realiza um `git hadouken`

- `npm run prod`: realiza o build com o ENV `PROD`

- `npm run remote`: realiza o build com o ENV `DEV` e gera um cache local dos dados remotos com o `--remote` configurado para projeto

TODO: gerar uma pasta para deploy que realize o build e copie os arquivos para a pasta do projeto de produção

## A fazer

- Adicionar um metodo no luego-cli para criar componentes e páginas

- Propor padrão de nomenclatura de classe para indicar que ela não possuirá styles. Sugestão: adicionar um "-" no início do nome, ex -btn-facebook

- Não utilizar o BEM

- Adicionar variaveis de media querie. Sugestão:
```
    @media-cellphone
    @media-cellphone-h
    @media-tablet
    @media-tablet-h
    @media-notebook
    @media-hd
    @media-fhd
    @media-4k
```

- Complementar o SvgFix (falta criar função para dar o replace no SVG igual ao helper que o Junior criou fazia)


