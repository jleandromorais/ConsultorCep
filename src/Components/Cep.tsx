import { useState } from "react";
import styles from '../Styles/Cep.module.css'

// Define e exporta o componente React chamado `cepForm`
export function CepForm() {
  // Estado para armazenar o CEP digitado
  const [cep, setCep] = useState("");

  // Estado para armazenar os dados do endereço retornado pela API
  const [endereco, setEndereco] = useState<any>(null);

  // Função chamada ao enviar o formulário
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault(); // Evita que a página recarregue

    // Remove todos os caracteres que não são dígitos do CEP (como traço)
    const cepLimpo = cep.replace(/\D/g, "");

    // Verifica se o CEP tem exatamente 8 dígitos
    if (cepLimpo.length !== 8) {
      alert("Cep inválido, deve conter 8 dígitos");
      return;
    }

    try {
      // Faz a requisição para a API ViaCEP com o CEP informado
      const response = await fetch(`https://viacep.com.br/ws/${cepLimpo}/json/`);
      const data = await response.json(); // Converte a resposta para JSON

      // Se a resposta contém o campo 'erro', o CEP não foi encontrado
      if (data.erro) {
        alert("Cep não encontrado");
        setEndereco(null); // Limpa o endereço
      } else {
        console.log("Endereço", data); // Exibe no console para debug
        setEndereco(data); // Atualiza o estado com os dados do endereço
      }
    } catch (error) {
      console.error("Erro ao buscar CEP:", error); // Mostra erro no console
      alert("Erro na requisição."); // Exibe alerta para o usuário
    }
  };

  return (
   

<div className={styles.container}>
  <h1 className={styles.title}>Olá!</h1>
  <p className={styles.subtitle}>Informe um CEP:</p>

  <form onSubmit={handleSubmit}>
    <div className={styles.formGroup}>
      <input
        type="text"
        className={styles.input}
        placeholder="Ex: 01001000"
        
        value={cep}
        onChange={(e) => setCep(e.target.value)}
        aria-label="Digite o CEP"
      />
      <div className={styles.errorMessage} id="error-message">CEP inválido. Verifique e tente novamente.</div>
    </div>

    <button className={styles.button} type="submit">Enviar</button>
  </form>

  <div className={styles.loading} id="loading">
    <div className={styles.spinner}></div>
  </div>

  {endereco && (
    <div className={`${styles.addressInfo} ${styles.visible}`} id="address-info">
      <div className={styles.infoItem}>
        <div className={styles.infoLabel}>Logradouro</div>
        <div className={styles.infoValue}>{endereco.logradouro}</div>
      </div>
      <div className={styles.infoItem}>
        <div className={styles.infoLabel}>Bairro</div>
        <div className={styles.infoValue}>{endereco.bairro}</div>
      </div>
      <div className={styles.infoItem}>
        <div className={styles.infoLabel}>Cidade</div>
        <div className={styles.infoValue}>{endereco.localidade}</div>
      </div>
      <div className={styles.infoItem}>
        <div className={styles.infoLabel}>UF</div>
        <div className={styles.infoValue}>{endereco.uf}</div>
      </div>
    </div>
  )}
</div>


  );
}
