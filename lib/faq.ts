export type FaqItem = {
  question: string;
  answer: string;
  placeholder?: boolean;
};

export const FAQS: FaqItem[] = [
  {
    // TODO: confirm exact operating hours, and whether there's after-hours/weekend service.
    question: "Qual é o horário de atendimento?",
    answer:
      "O horário exacto ainda está a ser definido com a equipa. Confirme disponibilidade no primeiro contacto — prioridade na Grande Lisboa e Margem Sul.",
    placeholder: true,
  },
  {
    // TODO: confirm average technician arrival time.
    question: "Em quanto tempo chega um técnico?",
    answer:
      "O prazo médio ainda está a confirmar. No primeiro contacto dizemos o que é possível para a sua localidade e o tipo de avaria.",
    placeholder: true,
  },
  {
    question: "Atendem a minha zona?",
    answer:
      "O atendimento imediato abrange a Grande Lisboa e a Margem Sul. No resto do país, a cobertura depende da disponibilidade de técnico — confirme a sua localidade por WhatsApp.",
  },
  {
    // TODO: confirm whether there's a travel/call-out fee.
    question: "Como funciona o orçamento?",
    answer:
      "No local, o técnico explica o valor antes de iniciar qualquer trabalho. Só avançamos com a sua autorização. Se a deslocação ou o diagnóstico tiverem custo, confirmamos isso no primeiro contacto — ainda a definir.",
    placeholder: true,
  },
  {
    question: "Os serviços têm garantia?",
    answer:
      "Sim. Nas reparações e serviços especializados, a garantia vai até 3 anos, conforme o tipo de serviço. Nas instalações com materiais fornecidos pelo próprio cliente (equipamento ou material comprado por sua conta), a garantia é de 6 meses sobre o serviço de instalação — o material segue a garantia do fabricante ou fornecedor.",
  },
  {
    question: "Emitem fatura?",
    answer: "Sim, é emitida fatura com NIF em todos os serviços.",
  },
];
