class No {
    constructor(valor, prioridade) {
        this.valor = valor;
        this.prioridade = prioridade;
    }
}

class FilaDePrioridade {
    constructor() {
        this.valores = [];
    }

    enfileirar(valor, prioridade) {
        const novoNo = new No(valor, prioridade);
        this.valores.push(novoNo);
        this.subirBolha();
    }

    subirBolha() {
        let indice = this.valores.length - 1;
        while (indice > 0) {
            let indicePai = Math.floor((indice - 1) / 2);
            if (this.valores[indice].prioridade >= this.valores[indicePai].prioridade) break;
            [this.valores[indice], this.valores[indicePai]] = [this.valores[indicePai], this.valores[indice]];
            indice = indicePai;
        }
    }

    desenfileirar() {
        if (this.valores.length === 0) return null;
        const menor = this.valores[0];
        const fim = this.valores.pop();
        if (this.valores.length > 0) {
            this.valores[0] = fim;
            this.afundar();
        }
        return menor;
    }

    afundar() {
        let indice = 0;
        const comprimento = this.valores.length;
        while (true) {
            let menorIndice = indice;
            let indiceFilhoEsquerdo = 2 * indice + 1;
            let indiceFilhoDireito = 2 * indice + 2;
            if (indiceFilhoEsquerdo < comprimento &&
                this.valores[indiceFilhoEsquerdo].prioridade < this.valores[menorIndice].prioridade) {
                menorIndice = indiceFilhoEsquerdo;
            } if (indiceFilhoDireito < comprimento &&
                this.valores[indiceFilhoDireito].prioridade < this.valores[menorIndice].prioridade) {
                menorIndice = indiceFilhoDireito;
            } if (menorIndice === indice) break;
            [this.valores[indice], this.valores[menorIndice]] = [this.valores[menorIndice], this.valores[indice]];
            indice = menorIndice;
        }
    }
}

class Grafo {
    constructor() {
        this.listaAdjacencia = {};
    }

    adicionarVertice(vertice) {
        if (!this.listaAdjacencia[vertice]) this.listaAdjacencia[vertice] = [];
    }

    adicionarAresta(vertice1, vertice2, peso) {
        this.listaAdjacencia[vertice1].push({ no: vertice2, peso });
        this.listaAdjacencia[vertice2].push({ no: vertice1, peso });
    }

    dijkstra(inicio, fim) {
        const nos = new FilaDePrioridade();
        const distancias = {};
        const anteriores = {};
        const caminho = [];
        
        for (let vertice in this.listaAdjacencia) {
            distancias[vertice] = vertice === inicio ? 0 : Infinity;
            anteriores[vertice] = null;
            nos.enfileirar(vertice, distancias[vertice]);
        } while (nos.valores.length) {
            const menor = nos.desenfileirar().valor;
            if (menor === fim) {
                for (let v = fim; v !== null; v = anteriores[v]) {
                    caminho.unshift(v);
                }
                return { caminho, custo: distancias[fim] };
            } if (distancias[menor] === Infinity) break;
            for (let { no: vizinho, peso } of this.listaAdjacencia[menor]) {
                let novaDistancia = distancias[menor] + peso;
                if (novaDistancia < distancias[vizinho]) {
                    distancias[vizinho] = novaDistancia;
                    anteriores[vizinho] = menor;
                    nos.enfileirar(vizinho, novaDistancia);
                }
            }
        }
        return { caminho: [], custo: Infinity };
    }
}

const grafo = new Grafo();
grafo.adicionarVertice("Ituporanga");
grafo.adicionarVertice("Rio do Sul");
grafo.adicionarVertice("Vidal Ramos");
grafo.adicionarVertice("Rio do Oeste");
grafo.adicionarVertice("Rio do Campo");
grafo.adicionarVertice("Santa Terezinha");
grafo.adicionarVertice("Aurora");
grafo.adicionarVertice("Presidente Getúlio");
grafo.adicionarVertice("Taió");
grafo.adicionarVertice("Pouso Redondo");
grafo.adicionarVertice("Imbuia");
grafo.adicionarVertice("Chapadão do Lageado");
grafo.adicionarVertice("Laurentino");
grafo.adicionarVertice("Salete");
grafo.adicionarVertice("Mirim Doce");

grafo.adicionarAresta("Ituporanga", "Rio do Sul", 52);
grafo.adicionarAresta("Ituporanga", "Aurora", 26);
grafo.adicionarAresta("Rio do Sul", "Vidal Ramos", 87);
grafo.adicionarAresta("Rio do Sul", "Aurora", 42);
grafo.adicionarAresta("Rio do Sul", "Imbuia", 114.4);
grafo.adicionarAresta("Rio do Sul", "Laurentino", 39);
grafo.adicionarAresta("Vidal Ramos", "Presidente Getúlio", 347.6);
grafo.adicionarAresta("Rio do Oeste", "Rio do Campo", 105);
grafo.adicionarAresta("Rio do Oeste", "Presidente Getúlio", 264);
grafo.adicionarAresta("Rio do Oeste", "Taió", 70);
grafo.adicionarAresta("Rio do Campo", "Santa Terezinha", 25);
grafo.adicionarAresta("Rio do Campo", "Taió", 81.4);
grafo.adicionarAresta("Santa Terezinha", "Taió", 73.5);
grafo.adicionarAresta("Aurora", "Imbuia", 117);
grafo.adicionarAresta("Presidente Getúlio", "Taió", 219);
grafo.adicionarAresta("Presidente Getúlio", "Chapadão do Lageado", 180.4);
grafo.adicionarAresta("Presidente Getúlio", "Salete", 50);
grafo.adicionarAresta("Taió", "Pouso Redondo", 158.4);
grafo.adicionarAresta("Taió", "Laurentino", 43);
grafo.adicionarAresta("Pouso Redondo", "Salete", 129);
grafo.adicionarAresta("Pouso Redondo", "Mirim Doce", 51);
grafo.adicionarAresta("Chapadão do Lageado", "Laurentino", 286);
grafo.adicionarAresta("Laurentino", "Salete", 62);
grafo.adicionarAresta("Salete", "Mirim Doce", 144);

function menorCaminho() {
    try {
        const origem = document.getElementById("origem").value;
        const destino = document.getElementById("destino").value;
        if (!origem || !destino) throw new Error("Por favor, selecione tanto a origem quanto o destino.");
        const resultado = grafo.dijkstra(origem, destino);
        const caminho = resultado.caminho.join(" -> ");
        const custo = resultado.custo;
        const resultadoDiv = document.getElementById("resultado");
        resultadoDiv.innerHTML = resultado.caminho.length 
            ? `<strong>Caminho mais curto:</strong><br>${caminho}<br><strong>Custo total:</strong> ${custo}` 
            : `<strong>Erro:</strong> Não foi possível encontrar um caminho entre ${origem} e ${destino}.`;
    } catch (error) {
        document.getElementById("resultado").innerHTML = `<strong>Erro:</strong> ${error.message}`;
    }
}