import {Lansing} from "./examples/lansing_school.js";

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
                borderWidth: 1
            }]
        },
        options: {
            'onClick': (e, elems, chart) => {
                chart.destroy()
                // Bad behavior
                const idx = elems[0].index;
                const name = Object.keys(withoutTotal)[idx]
                currentPath.push(name)
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
    let view= staticData;
    for (const token of currentPath) {
        view = view[token];
    }
    currentChart.destroy()
    currentChart = createNewChart(view)
}

document.getElementById("back").onclick = goBack

currentChart = createNewChart(staticData)