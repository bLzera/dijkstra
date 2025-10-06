class Grafo {
    constructor() {
        this.listaAdjacencia = {};
        this.tipoDicionario = {
            asfalto: 1.0,
            calcamento: 1.3,
            chao: 1.8,
        };
        this.estadoDicionario = {
            otima: 1,
            boa: 1.25,
            ruim: 1.7,
        };
    }

    adicionarVertice(vertice) {
        if (!this.listaAdjacencia[vertice]) {
            this.listaAdjacencia[vertice] = [];
        }
    }

    calcularDistancia(edge) {
        return this.tipoDicionario[edge.tipo] * this.estadoDicionario[edge.estado] * edge.distancia;
    }

    adicionarAresta(v1, v2, tipo, estado, distancia) {
        this.listaAdjacencia[v1].push({ node: v2, tipo, estado, distancia });
        this.listaAdjacencia[v2].push({ node: v1, tipo, estado, distancia });
    }

    dijkstra(inicio) {
        const distancias = {};
        const anterior = {};
        const visitado = {};

        for (let vertice in this.listaAdjacencia) {
            distancias[vertice] = Infinity;
            anterior[vertice] = null;
            visitado[vertice] = false;
        }
        distancias[inicio] = 0;

        while (true) {
            let verticeAtual = null;
            let menorDistancia = Infinity;

            for (let vertice in distancias) {
                if (!visitado[vertice] && distancias[vertice] < menorDistancia) {
                    menorDistancia = distancias[vertice];
                    verticeAtual = vertice;
                }
            }

            if (verticeAtual === null) break;

            visitado[verticeAtual] = true;

            for (let adj of this.listaAdjacencia[verticeAtual]) {
                let peso = this.calcularDistancia(adj);
                let candidate = distancias[verticeAtual] + peso;

                if (candidate < distancias[adj.node]) {
                    distancias[adj.node] = candidate;
                    anterior[adj.node] = verticeAtual;
                }
            }
        }

        return { distancias, anterior };
    }

    menorCaminho(inicio, final) {
        const { distancias, anterior } = this.dijkstra(inicio);
        const caminho = [];
        let atual = final;

        while (atual) {
            caminho.push(atual);
            atual = anterior[atual];
        }

        return {
            distance: distancias[final],
            caminho: caminho.reverse()
        };
    }
}


const g = new Grafo();

function criaGrafoAltoVale(grafo) {
    const cidades = [
        'Agronômica','Rio do Sul','Ituporanga','Lontras','Trombudo Central','Taió',
        'Presidente Getúlio','Rio do Oeste','Salete','Santa Terezinha','Vidal Ramos',
        'Witmarsum','Vitor Meireles','Pouso Redondo','Presidente Nereu','Rio do Campo',
        'Mirim Doce','Petrolândia','Agrolândia','Atalanta','Aurora','Braço do Trombudo',
        'Chapadão do Lageado','Dona Emma','Ibirama','Imbuia','José Boiteux','Laurentino'
    ];

    cidades.forEach(c => grafo.adicionarVertice(c));

    grafo.adicionarAresta('Agronômica', 'Rio do Sul', 'asfalto', 'ruim', 10);
    grafo.adicionarAresta('Agronômica', 'Witmarsum', 'calcamento', 'ruim', 5);
    grafo.adicionarAresta('Agronômica', 'Vidal Ramos', 'asfalto', 'otima', 12.5);
    grafo.adicionarAresta('Agronômica', 'Trombudo Central', 'calcamento', 'otima', 8);
    grafo.adicionarAresta('Agronômica', 'Taió', 'asfalto', 'boa', 15);
    grafo.adicionarAresta('Agronômica', 'Presidente Getúlio', 'calcamento', 'otima', 14);
    grafo.adicionarAresta('Agronômica', 'Lontras', 'chao', 'boa', 5);
    grafo.adicionarAresta('Agronômica', 'Ituporanga', 'asfalto', 'boa', 4);

    grafo.adicionarAresta('Rio do Sul', 'Agrolândia', 'calcamento', 'boa', 4);
    grafo.adicionarAresta('Rio do Sul', 'Atalanta', 'asfalto', 'ruim', 18);
    grafo.adicionarAresta('Rio do Sul', 'Aurora', 'asfalto', 'boa', 9);
    grafo.adicionarAresta('Rio do Sul', 'Braço do Trombudo', 'asfalto', 'otima', 5);
    grafo.adicionarAresta('Rio do Sul', 'Chapadão do Lageado', 'calcamento', 'otima', 3);

    grafo.adicionarAresta('Lontras', 'Mirim Doce', 'calcamento', 'ruim', 9);
    grafo.adicionarAresta('Lontras', 'Petrolândia', 'asfalto', 'ruim', 6);
    grafo.adicionarAresta('Lontras', 'Pouso Redondo', 'asfalto', 'otima', 3);
    grafo.adicionarAresta('Lontras', 'Presidente Getúlio', 'calcamento', 'otima', 4);

    grafo.adicionarAresta('Rio do Oeste', 'Presidente Getúlio', 'calcamento', 'boa', 5);
    grafo.adicionarAresta('Rio do Oeste', 'Presidente Nereu', 'asfalto', 'ruim', 8);
    grafo.adicionarAresta('Rio do Oeste', 'Santa Terezinha', 'chao', 'boa', 7);
    grafo.adicionarAresta('Rio do Oeste', 'Salete', 'calcamento', 'otima', 8);

    grafo.adicionarAresta('Trombudo Central', 'Taió', 'asfalto', 'otima', 9);
    grafo.adicionarAresta('Trombudo Central', 'Salete', 'asfalto', 'boa', 6);
    grafo.adicionarAresta('Trombudo Central', 'Santa Terezinha', 'asfalto', 'boa', 14);
    grafo.adicionarAresta('Trombudo Central', 'Vidal Ramos', 'chao', 'ruim', 25);

    grafo.adicionarAresta('Taió', 'Salete', 'calcamento', 'ruim', 3);
    grafo.adicionarAresta('Taió', 'Rio do Oeste', 'asfalto', 'boa', 6);

    grafo.adicionarAresta('Salete', 'Santa Terezinha', 'chao', 'ruim', 5);
    grafo.adicionarAresta('Vidal Ramos', 'Witmarsum', 'asfalto', 'ruim', 7);
    grafo.adicionarAresta('Vidal Ramos', 'Vitor Meireles', 'calcamento', 'boa', 5);

    grafo.adicionarAresta('Presidente Getúlio', 'Presidente Nereu', 'asfalto', 'otima', 8);
    grafo.adicionarAresta('Pouso Redondo', 'Presidente Nereu', 'asfalto', 'boa', 9);
    grafo.adicionarAresta('Presidente Nereu', 'Rio do Campo', 'calcamento', 'boa', 6);
    grafo.adicionarAresta('Vitor Meireles', 'Witmarsum', 'calcamento', 'otima', 5);

    grafo.adicionarAresta('Ituporanga', 'Dona Emma', 'calcamento', 'boa', 1)
    grafo.adicionarAresta('Ituporanga', 'Ibirama', 'asfalto', 'boa', 2)
    grafo.adicionarAresta('Ituporanga', 'Imbuia', 'asfalto', 'otima', 5)
    grafo.adicionarAresta('Ituporanga', 'José Boiteux', 'chao', 'otima', 4)
    grafo.adicionarAresta('Ituporanga', 'Laurentino', 'chao', 'ruim', 8)
}

criaGrafoAltoVale(g);


function calcularCaminho() {
    const inicio = document.getElementById("inicio").value;
    const fim = document.getElementById("fim").value;

    if (inicio === fim) {
        document.getElementById("resultado").innerHTML =
            `<p>Você já está em <strong>${inicio}</strong>.</p>`;
        return;
    }

    const resultado = g.menorCaminho(inicio, fim);

    document.getElementById("resultado").innerHTML = `
        <p><strong>Caminho:</strong> ${resultado.caminho.join(" → ")}</p>
        <p><strong>Distância total:</strong> ${resultado.distance.toFixed(2)} km</p>
    `;
}
