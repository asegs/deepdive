import {Lansing} from "./examples/lansing_school.js";

const normalColors = ['yellow', 'blue', 'red', 'orange', 'purple', 'gold']

const ctx = document.getElementById('myChart');
let currentPath = []
const staticData = Lansing;
let currentChart;

function createNewChart(data) {
    const withoutTotal = Object.fromEntries(Object.entries(data).filter(d => d[0] !== 'total'));
    return new Chart(ctx, {
        type: 'pie',
        data: {
            labels: Object.keys(withoutTotal),
            datasets: [{
                label: '$ spent',
                data: Object.values(withoutTotal).map(v => typeof v === 'object' ? v['total'] : v),
                borderWidth: 2,
                borderColor: Object.values(withoutTotal).map(v => typeof v === 'object' ? 'green' : 'gray'),
                backgroundColor: new Array(Object.keys(withoutTotal).length).fill(0).map((_, i) => normalColors[i % normalColors.length])
            }]
        },
        options: {
            'onClick': (e, elems, chart) => {
                chart.destroy()
                // Bad behavior
                const idx = elems[0].index;
                const name = Object.keys(withoutTotal)[idx]
                currentPath.push(name)
                document.getElementById("path").innerText = currentPath.join('.')
                let view = staticData;
                for (const token of currentPath) {
                    view = view[token]
                }
                currentChart = createNewChart(view)
            }
        },
    })
}

export function goBack() {
    currentPath.pop()
    document.getElementById("path").innerText = currentPath.join('.')
    let view= staticData;
    for (const token of currentPath) {
        view = view[token];
    }
    currentChart.destroy()
    currentChart = createNewChart(view)
}

document.getElementById("back").onclick = goBack

currentChart = createNewChart(staticData)