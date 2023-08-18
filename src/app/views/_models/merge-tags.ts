const mergeTags = {
  leilao: {
    name: "Leilão",
    mergeTags: {
      NomeLeilao: {
        name: "Nome",
        value: "{{NomeLeilao}}",
      },
      DataLeilao: {
        value: "{{DataLeilao}}",
        name: "Data (dd/mm/yyyy)",
      },
      HoraLeilao: {
        value: "{{HoraLeilao}}",
        name: "Hora (hh:mm)",
      },
      DataLeilaoExtenso: {
        value: "{{DataLeilaoExtenso}}",
        name: "Data por Extenso",
      },
      DataInicioLiberacao: {
        value: "{{DataInicioLiberacao}}",
        name: "Data Inicio da Liberacao",
      },
      DataDiarioOficial: {
        value: "{{DataDiarioOficial}}",
        name: "Data Diário Oficial",
      },
      NumeroDiarioOficial: {
        value: "{{NumeroDiarioOficial}}",
        name: "Numero Diário Oficial",
      },
    },
  },
  lote: {
    name: "Lote",
    mergeTags: {
      NumeroLote: {
        value: "{{NumeroLote}}",
        name: "Numero do Lote",
      },
      DescricaoLote: {
        value: "{{DescricaoLote}}",
        name: "Dados do Lote (Placa, Chassi...)",
      },
      ValorUltimoLance: {
        value: "{{ValorUltimoLance}}",
        name: "Valor do Último Lance",
      },
      Comissao: {
        value: "{{Comissao}}",
        name: "Valor da Comissao",
      },
      ValorArrematacao: {
        value: "{{ValorArrematacao}}",
        name: "Valor Total da Arrematacao",
      },
    },
  },
  leiloeiro: {
    name: "Leiloeiro",
    mergeTags: {
      NomeLeiloeiro: {
        value: "{{NomeLeiloeiro}}",
        name: "Nome",
      },
      NomeComercialLeiloeiro: {
        value: "{{NomeComercialLeiloeiro}}",
        name: "Nome Comercial",
      },
      CpfLeiloeiro: {
        value: "{{CpfLeiloeiro}}",
        name: "CPF",
      },
      ImagemLeiloeiro: {
        value: "{{ImagemLeiloeiro}}",
        name: "Logo",
        sample:
          "https://static.eblonline.com.br/template-imagens/25f44279-bf4b-4584-89ab-699bb8fac784.jpg",
      },
      MatriculaLeiloeiro: {
        value: "{{MatriculaLeiloeiro}}",
        name: "Matricula",
      },
      OrgaoRegistroLeiloeiro: {
        value: "{{OrgaoRegistroLeiloeiro}}",
        name: "Orgao de Registro",
      },
      EstadoOrgaoLeiloeiro: {
        value: "{{EstadoOrgaoLeiloeiro}}",
        name: "Estado do Orgao",
      },
      GeneroLeiloeiro: {
        value: "{{GeneroLeiloeiro}}",
        name: "Texto Leiloeiro com genero",
        sample: "Leiloeiro(a)",
      },
      AssinaturaLeiloeiro: {
        value: "{{AssinaturaLeiloeiro}}",
        name: "Assinatura (imagem)",
      },
      SequencialNotaLeiloeiro: {
        value: "{{SequencialNotaLeiloeiro}}",
        name: "Numero Sequencial da Nota",
      },
      NumeroNota: {
        value: "{{NumeroNota}}",
        name: "Numero Aleatório da Nota",
      },
      EnderecoCompleto: {
        value: "{{EnderecoCompletoLeiloeiro}}",
        name: "Endereço Completo",
      },
    },
  },
  arrematante: {
    name: "Arrematante",
    mergeTags: {
      NomeArrematante: {
        value: "{{NomeArrematante}}",
        name: "Nome Completo",
      },
      CpfCnpjArrematante: {
        value: "{{CpfCnpjArrematante}}",
        name: "CPF/CNPJ",
      },
      EnderecoArrematante: {
        value: "{{EnderecoArrematante}}",
        name: "Endereco Completo",
      },
      NomeUsuarioArrematante: {
        value: "{{NomeUsuarioArrematante}}",
        name: "Nome do Usuário",
      },
      EmailArrematante: {
        value: "{{EmailArrematante}}",
        name: "Email",
      },
      TelefoneArrematante: {
        value: "{{TelefoneArrematante}}",
        name: "Telefone",
      },
    },
  },
  empresa: {
    name: "Empresa",
    mergeTags: {
      RazaoSocialEmpresa: {
        value: "{{RazaoSocialEmpresa}}",
        name: "Razao Social",
      },
    },
  },
  comitente: {
    name: "Comitente",
    mergeTags: {
      RazaoSocialComitente: {
        value: "{{RazaoSocialComitente}}",
        name: "Razao Social",
      },
    },
  },
};

export { mergeTags };
