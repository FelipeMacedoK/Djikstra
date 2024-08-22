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
        const elemento = this.valores[indice];
        while (indice > 0) {
            let indicePai = Math.floor((indice - 1) / 2);
            let pai = this.valores[indicePai];
            if (elemento.prioridade >= pai.prioridade) break;
            this.valores[indicePai] = elemento;
            this.valores[indice] = pai;
            indice = indicePai;
        }
    }

    desenfileirar() {
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
        const elemento = this.valores[0];

        while (true) {
            let indiceFilhoEsquerdo = 2 * indice + 1;
            let indiceFilhoDireito = 2 * indice + 2;
            let filhoEsquerdo, filhoDireito;
            let troca = null;

            if (indiceFilhoEsquerdo < comprimento) {
                filhoEsquerdo = this.valores[indiceFilhoEsquerdo];
                if (filhoEsquerdo.prioridade < elemento.prioridade) {
                    troca = indiceFilhoEsquerdo;
                }
            }
            if (indiceFilhoDireito < comprimento) {
                filhoDireito = this.valores[indiceFilhoDireito];
                if (filhoDireito.prioridade < (troca === null ? elemento.prioridade : filhoEsquerdo.prioridade)) {
                    troca = indiceFilhoDireito;
                }
            }

            if (troca === null) break;
            this.valores[indice] = this.valores[troca];
            this.valores[troca] = elemento;
            indice = troca;
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
        let menor;

        for (let vertice in this.listaAdjacencia) {
            distancias[vertice] = vertice === inicio ? 0 : Infinity;
            nos.enfileirar(vertice, distancias[vertice]);
            anteriores[vertice] = null;
        }

        while (nos.valores.length) {
            menor = nos.desenfileirar().valor;
            if (menor === fim) {
                while (anteriores[menor]) {
                    caminho.push(menor);
                    menor = anteriores[menor];
                }
                break;
            }

            if (menor || distancias[menor] !== Infinity) {
                for (let vizinho of this.listaAdjacencia[menor]) {
                    let candidato = distancias[menor] + vizinho.peso;
                    let proximoVizinho = vizinho.no;

                    if (candidato < distancias[proximoVizinho]) {
                        distancias[proximoVizinho] = candidato;
                        anteriores[proximoVizinho] = menor;
                        nos.enfileirar(proximoVizinho, candidato);
                    }
                }
            }
        }

        return { caminho: caminho.concat(menor).reverse(), custo: distancias[fim] };
    }
}

// Exemplo de uso:
const grafo = new Grafo();
grafo.adicionarVertice("ITU");
grafo.adicionarVertice("RSL");
grafo.adicionarVertice("VID");
grafo.adicionarVertice("RDO");
grafo.adicionarVertice("RCA");
grafo.adicionarVertice("STA");
grafo.adicionarVertice("AUR");
grafo.adicionarVertice("PGE");
grafo.adicionarVertice("TAI");
grafo.adicionarVertice("POU");
grafo.adicionarVertice("IMB");
grafo.adicionarVertice("CHA");
grafo.adicionarVertice("LAU");
grafo.adicionarVertice("SAL");
grafo.adicionarVertice("MIR");

grafo.adicionarAresta("ITU", "RSL", 52);
grafo.adicionarAresta("RSL", "ITU", 52);
grafo.adicionarAresta("ITU", "AUR", 26);
grafo.adicionarAresta("AUR", "ITU", 26);
grafo.adicionarAresta("RSL", "VID", 87);
grafo.adicionarAresta("VID", "RSL", 87);
grafo.adicionarAresta("RSL", "AUR", 42);
grafo.adicionarAresta("AUR", "RSL", 42);
grafo.adicionarAresta("RSL", "IMB", 114.4);
grafo.adicionarAresta("IMB", "RSL", 114.4);
grafo.adicionarAresta("RSL", "LAU", 39);
grafo.adicionarAresta("LAU", "RSL", 39);
grafo.adicionarAresta("VID", "PGE", 347.6);
grafo.adicionarAresta("PGE", "VID", 347.6);
grafo.adicionarAresta("RDO", "RCA", 105);
grafo.adicionarAresta("RCA", "RDO", 105);
grafo.adicionarAresta("RDO", "PGE", 264);
grafo.adicionarAresta("PGE", "RDO", 264);
grafo.adicionarAresta("RDO", "TAI", 70);
grafo.adicionarAresta("TAI", "RDO", 70);
grafo.adicionarAresta("RCA", "STA", 25);
grafo.adicionarAresta("STA", "RCA", 25);
grafo.adicionarAresta("RCA", "TAI", 81.4);
grafo.adicionarAresta("TAI", "RCA", 81.4);
grafo.adicionarAresta("STA", "TAI", 73.5);
grafo.adicionarAresta("TAI", "STA", 73.5);
grafo.adicionarAresta("AUR", "IMB", 117);
grafo.adicionarAresta("IMB", "AUR", 117);
grafo.adicionarAresta("PGE", "TAI", 219);
grafo.adicionarAresta("TAI", "PGE", 219);
grafo.adicionarAresta("PGE", "CHA", 180.4);
grafo.adicionarAresta("CHA", "PGE", 180.4);
grafo.adicionarAresta("PGE", "SAL", 50);
grafo.adicionarAresta("SAL", "PGE", 50);
grafo.adicionarAresta("TAI", "POU", 158.4);
grafo.adicionarAresta("POU", "TAI", 158.4);
grafo.adicionarAresta("TAI", "LAU", 43);
grafo.adicionarAresta("LAU", "TAI", 43);
grafo.adicionarAresta("POU", "SAL", 129);
grafo.adicionarAresta("SAL", "POU", 129);
grafo.adicionarAresta("POU", "MIR", 51);
grafo.adicionarAresta("MIR", "POU", 51);
grafo.adicionarAresta("CHA", "LAU", 286);
grafo.adicionarAresta("LAU", "CHA", 286);
grafo.adicionarAresta("LAU", "SAL", 62);
grafo.adicionarAresta("SAL", "LAU", 62);
grafo.adicionarAresta("SAL", "MIR", 144);
grafo.adicionarAresta("MIR", "SAL", 144);

function menorCaminho() {
    const origem = document.getElementById("origem").value;
    const destino = document.getElementById("destino").value;
    const resultado = grafo.dijkstra(origem, destino);
    const caminho = resultado.caminho.join(" -> ");
    const custo = resultado.custo;

    const resultadoDiv = document.getElementById("resultado");
    resultadoDiv.innerHTML = `<strong>Caminho mais curto:</strong> ${caminho}<br><strong>Custo total:</strong> ${custo}`;
}
