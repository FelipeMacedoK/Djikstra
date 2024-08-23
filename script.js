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
    const origem = document.getElementById("origem").value;
    const destino = document.getElementById("destino").value;
    const resultado = grafo.dijkstra(origem, destino);
    const caminho = resultado.caminho.join(" -> ");
    const custo = resultado.custo;

    const resultadoDiv = document.getElementById("resultado");
    resultadoDiv.innerHTML = `<strong>Caminho mais curto:</strong> ${caminho}<br><strong>Custo total:</strong> ${custo}`;
}
