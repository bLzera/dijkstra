const container_principal = document.getElementById('main_container');

const ponto1 = document.getElementById('ponto1');
const ponto2 = document.getElementById('ponto2');
const resultado = document.getElementById('resultado');
const custo = document.getElementById('custo');

let result = 0;

function desenhaVertice(vertice, vizinhos){
    const id = vertice.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase();

    if(!document.getElementById(id)){
        const opPonto1 = document.createElement('option');
        
        opPonto1.setAttribute('value', vertice);
        opPonto1.innerText = vertice;

        const opPonto2 = opPonto1.cloneNode(true);

        ponto1.appendChild(opPonto1);
        ponto2.appendChild(opPonto2);
    } else {
        alert(`vértice ${vertice} já existe`);
    }
};

function desenhaAresta(start, end, tipo, estado, distancia){
    const startFormatted = start.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase();
    const endFormatted = end.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase();

    const pontos = [startFormatted, endFormatted];
    const id = pontos.join('_');

    if(!document.getElementById(pontos.join('_')) && !document.getElementById(pontos.reverse().join('_'))){
        const lista_aresta = document.getElementById('lista_aresta');

        const linha = document.createElement('tr');
        linha.setAttribute('id', id);

        const tdId = document.createElement('td');
        tdId.innerText = id;
        const tdNome = document.createElement('td');
        tdNome.innerText = start + ' - ' + end;
        const tdTipo = document.createElement('td');
        tdTipo.innerText = tipo;
        const tdEstado = document.createElement('td');
        tdEstado.innerText = estado;
        const tdDistancia = document.createElement('td');
        tdDistancia.innerText = distancia;

        linha.appendChild(tdId);
        linha.appendChild(tdNome);
        linha.appendChild(tdTipo);
        linha.appendChild(tdEstado);
        linha.appendChild(tdDistancia);

        lista_aresta.appendChild(linha);
    }
}

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

    atualizaTela(){
        for(vertice in this.listaAdjacencia){
            desenhaVertice(vertice, this.listaAdjacencia[vertice]);
            for(vizinho in this.listaAdjacencia[vertice]){
                desenhaAresta(vertice, vizinho.node, this.listaAdjacencia[vertice].tipo, this.listaAdjacencia[vertice].estado);
            }
        }
    }

    adicionarVertice(vertice) {
        if (!this.listaAdjacencia[vertice]) {
            this.listaAdjacencia[vertice] = [];
        }
        desenhaVertice(vertice, this.listaAdjacencia[vertice]);
    }

    calcularDistancia(edge) {
        return this.tipoDicionario[edge.tipo] * this.estadoDicionario[edge.estado] * edge.distancia;
    }

    adicionarAresta(v1, v2, tipo, estado, distancia) {
        this.listaAdjacencia[v1].push({ node: v2, tipo, estado, distancia });
        this.listaAdjacencia[v2].push({ node: v1, tipo, estado, distancia });
        desenhaAresta(v1, v2, tipo, estado, distancia);
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
            // Pega o vértice não visitado com menor distância
            let verticeAtual = null;
            let menorDistancia = Infinity;

            for (let vertice in distancias) {
                if (!visitado[vertice] && distancias[vertice] < menorDistancia) {
                    menorDistancia = distancias[vertice];
                    verticeAtual = vertice;
                }
            }

            if (verticeAtual === null) break; // acabou

            visitado[verticeAtual] = true;

            // Atualiza distâncias dos vizinhos
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
            distancia: distancias[final],
            caminho: caminho.reverse()
        };
    }
}

// ----------------- TESTE -----------------

const g = new Grafo();

function criaGrafoAltoVale(grafo) {
    grafo.adicionarVertice('Agronômica');
    grafo.adicionarVertice('Rio do Sul');
    grafo.adicionarVertice('Ituporanga');
    grafo.adicionarVertice('Lontras');
    grafo.adicionarVertice('Trombudo Central');
    grafo.adicionarVertice('Taió');
    grafo.adicionarVertice('Presidente Getúlio');
    grafo.adicionarVertice('Rio do Oeste');
    grafo.adicionarVertice('Salete');
    grafo.adicionarVertice('Santa Terezinha');
    grafo.adicionarVertice('Vidal Ramos');
    grafo.adicionarVertice('Witmarsum');
    grafo.adicionarVertice('Vitor Meireles');
    grafo.adicionarVertice('Pouso Redondo');
    grafo.adicionarVertice('Presidente Nereu');
    grafo.adicionarVertice('Rio do Campo');
    grafo.adicionarVertice('Sweet Mirim');
    grafo.adicionarVertice('Petrolândia');
    grafo.adicionarVertice('Agrolândia');
    grafo.adicionarVertice('Atalanta');
    grafo.adicionarVertice('Aurora');
    grafo.adicionarVertice('Braço do Trombudo');
    grafo.adicionarVertice('Chapadão do Lageado');
    grafo.adicionarVertice('Dona Emma');
    grafo.adicionarVertice('Ibirama');
    grafo.adicionarVertice('Imbuia');
    grafo.adicionarVertice('José Boiteux');
    grafo.adicionarVertice('Laurentino');

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
    grafo.adicionarAresta('Lontras', 'Sweet Mirim', 'calcamento', 'ruim', 9);
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

    console.log(g.listaAdjacencia)
}

function calcular(){
    result = g.menorCaminho(ponto1.value, ponto2.value)
    resultado.innerText = result.caminho.join(' -> ').normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase();
    custo.innerText = result.distancia;
    console.log(result);
    
};

criaGrafoAltoVale(g);