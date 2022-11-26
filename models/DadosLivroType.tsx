/* eslint-disable prettier/prettier */
export type DadosLivroType = {
    codigoLivro: number,
    nomeLivro: string,
    dataLancamento: string,
    codigoIsbn: number,
    nomeImagem: string,
    nomeArquivoImagem: string,
    urlImagem: string,
    editoraDTO: {
      codigoEditora: number,
      nomeEditora: string,
    },
    autorDTO: {
      codigoAutor: number,
      nomeAutor: string
    };
  };
