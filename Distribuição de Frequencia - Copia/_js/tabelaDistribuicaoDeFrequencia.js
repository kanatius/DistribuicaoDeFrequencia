function montarTabela(){
	var inputs = document.getElementsByName("tipoDeDado");
	var valor = document.getElementById("valores").value.toLowerCase();
	valor = valor.toString().replace(" ", "");
	var valores = valor.split(",");

	//primeiro passo - verificar se o dado é numerico ou textual
	var contadorDeOcorrencias;

	var Fj;
	var Fj2;
	var qtdClasses;

	var prioridade; //pra caso o dado seja textual
	var nomesEncontrados;

	var classesFinal; //pra caso o dado seja numerico
	////////////////////////////////////////////////////////////////////////////////////////////////NUMEROS
	if(inputs[0].checked){ //Entra no if se o valor for numerico
		for(i in valores)
			valores[i] = parseFloat(valores[i]);
		
		//ordenando valores	
		//console.log(valores);
		valores = valores.sort(function(a, b){
			return a - b;
		}); 
		//valores odernados

	
		var numerosOrdenados = valores;

			//console.log(numerosOrdenados);
		////////////////////////////////////
		var menorNum = numerosOrdenados[0];
		var maiorNum = numerosOrdenados[numerosOrdenados.length - 1];
		
		var intervaloTotal = maiorNum - menorNum;
		
		var metodo = prompt("FAZER POR:\n\n(1) Raiz de N\n(2) 3 + log n\n\n(Caso nao seja informado um valor não correspondente, será feito pelo metodo 1");

		if(metodo == "2")
			qtdClasses = Math.round(3 + Math.log(numerosOrdenados.length));
		else
			qtdClasses = Math.round(Math.sqrt(valores.length));


		var intervaloDeClasse = intervaloTotal/qtdClasses; 
		//console.log(intervaloDeClasse);

		
		classesFinal = [qtdClasses];
		
		var valorFinalDaClasse = menorNum;
		
		for(var i=0; i<qtdClasses;i++){
			valorFinalDaClasse += intervaloDeClasse;
			classesFinal[i] = valorFinalDaClasse;
			console.log("classe "+(i+1)+" vai ate "+classesFinal[i]);
		}
		
		var contadorNumeros = [qtdClasses];
		for(var i=0; i<qtdClasses;i++){
			contadorNumeros[i] = 0;
		}
		//console.log(contadorNumeros);
		
		for(var i=0; i<numerosOrdenados.length; i++){ // roda o vetor maior
		
			for(var j=0; j<qtdClasses; j++){ // roda o vetor com os valores finais de cada classe
		
				if(numerosOrdenados[i] == maiorNum){
					contadorNumeros[contadorNumeros.length-1]++;
					break;
				}
				//console.log(numerosOrdenados[i]+"-"+ valorFinalDaClasse[j])
				if(numerosOrdenados[i] < classesFinal[j]){
					contadorNumeros[j]++;
					break;
				}
			}
		}

		Fj = contadorNumeros;

		////////////////////////////////////////////////////////////////////////////////////////////////PALAVRAS
	}else if(inputs[1].checked){ //Entra no if se o valor for textual
		//console.log("Entrou 2");
		nomesEncontrados = {};
		qtdClasses = 0;
		for(var i=0; i<valores.length; i++){ //percorrer o vetor grande
			var nome = valores[i].trim();
			if(nomesEncontrados[nome] == null){
				qtdClasses++;  //conta quantas palavras forma achadas, so é adicionada quando é encontrado pela primeira vez
				nomesEncontrados[nome]= 0;
			}
			nomesEncontrados[nome]++; //contador de palavras, será usado depois
		}

		var msgPrompt = "";
		for (var chave in nomesEncontrados) {
				msgPrompt += chave.toLocaleUpperCase() + " ";
		}
		var prioridadeInput = (prompt("Digite a sequencia de prioridade da palavras, do menos ao mais significativo SEPARADAS POR VÍRGULA (,):\nPalavras encontradas:\n\n"+ msgPrompt +"\n\nExemplo:\nPalavras achadas: bom ruim otimo\nEntrada: ruim, bom, Otimo (espaço é opcional)")).toLocaleLowerCase();
		var prioridadeInput = prioridadeInput.replace(" ", "");
		prioridade = prioridadeInput.split(",");
		for(chave in prioridade){
			prioridade[chave] = prioridade[chave].trim();
		}
		
		if(prioridade.length != qtdClasses){
			alert("Quantidade de palavras inseridas incorreta");
			return;
		}
		
		//verificar se os nomes estao corretos
		for(chave in prioridade){
			if(nomesEncontrados[prioridade[chave]] == null){
				alert("nome inserido nao consta nos valores da box: "+ prioridade[chave]);
				return;
			}
		}

		for(chave in prioridade){ //Com esse for, da pra fazer a tabela
			var palavra = prioridade[chave];
			//console.log(palavra+" "+nomesEncontrados[palavra]);
		}

			Fj2 = nomesEncontrados;
			//console.log(prioridade);		
		
	}
	
	//transformar nomes em numeros caso seja textual
	var cont = 0;

	if(inputs[1].checked){
		Fj = [qtdClasses];

		for(i in prioridade){
			var nome = prioridade[i];
			Fj[cont++]= Fj2[nome];
		}
	}
		
	var Fj_ = [qtdClasses]; 

	for(i in Fj) //inicia
		Fj_[i] = 0;

	for(var i=0; i<qtdClasses; i++){
		if(i==0)
			Fj_[i]= Fj[i];
		else	
			Fj_[i]= Fj[i] + Fj_[i-1]; //recebe os valores de Fj_
	}

	var somatorio = Fj_[qtdClasses-1];

	var fj = [qtdClasses];
	var fj_ = [qtdClasses];

	for(var i=0; i<qtdClasses; i++){
		fj[i] = Fj[i]/somatorio;
	}
	
	for(var i=0; i<qtdClasses; i++){
		if(i==0)
			fj_[i] = fj[i];
		else
			fj_[i] = fj[i] + fj_[i-1];
	}

	var cj = [qtdClasses];
	cont = 0;
	if(inputs[0].checked){
		for(i in classesFinal){
			cj[cont++] = (classesFinal[i] + classesFinal[i] - intervaloDeClasse)/2;
		}
	}

	var tabela = document.getElementById("resposta");

	//console.log(tabela.rows.length);

	while(tabela.rows.length > 1){ //apaga as linhas
		tabela.deleteRow(1);
	}
	//criando as linhas da tabela
	for(var i=0; i<qtdClasses; i++){
		var linha = document.createElement("tr"); 

		var td1 = document.createElement("td"); //j
		td1.innerHTML = i+1;
		var td2 = document.createElement("td");
		if(inputs[0].checked){
			td2.innerHTML = (classesFinal[i] - intervaloDeClasse).toFixed(1) + " |------- " + ((i==qtdClasses-1)?"|":"") + (classesFinal[i]).toFixed(1);
		}else{

			td2.innerHTML = prioridade[i];
		}
		var td3 = document.createElement("td");
		td3.innerHTML = Fj[i];
		var td4 = document.createElement("td");
		td4.innerHTML = Fj_[i];
		var td5 = document.createElement("td");
		td5.innerHTML = fj[i].toFixed(2);
		var td6 = document.createElement("td");
		td6.innerHTML = fj_[i].toFixed(2);
		var td7 = document.createElement("td");
		if(inputs[0].checked)
			td7.innerHTML = cj[i].toFixed(1);
		else
			td7.innerHTML = "...";

		linha.appendChild(td1);
		linha.appendChild(td2);
		linha.appendChild(td3);
		linha.appendChild(td4);
		linha.appendChild(td5);
		linha.appendChild(td6);
		linha.appendChild(td7);	

		tabela.appendChild(linha);
		
	}

	var ultimaLinha = document.createElement("tr");
	for(var i=0; i<7; i++){
		var td = document.createElement("td");
		if(i==1)
			td.innerHTML = "&Sigma;";
		else if(i==2)
			td.innerHTML = somatorio;
		else if(i==4)
			td.innerHTML = fj_[fj_.length -1]; //fj_ja é calculado pela soma de todas as porcentagens ateriores

		ultimaLinha.appendChild(td);
	}
	tabela.appendChild(ultimaLinha);
}