// ===== DONNÉES =====
const data = {
  revenus: {
    labels: ['Janv', 'Févr', 'Mars', 'Avr', 'Mai', 'Juin'],
    values: [32400, 28900, 35600, 41200, 38700, 48290]
  },
  annuel: {
    labels: ['Juil', 'Août', 'Sep', 'Oct', 'Nov', 'Déc', 'Janv', 'Févr', 'Mars', 'Avr', 'Mai', 'Juin'],
    values: [22000, 19500, 25300, 31000, 44500, 52000, 32400, 28900, 35600, 41200, 38700, 48290]
  }
};

// ===== CHART REVENUS =====
const revenusCtx = document.getElementById('revenusChart').getContext('2d');
const gradient = revenusCtx.createLinearGradient(0, 0, 0, 300);
gradient.addColorStop(0, 'rgba(124, 58, 237, 0.3)');
gradient.addColorStop(1, 'rgba(124, 58, 237, 0)');

let revenusChart = new Chart(revenusCtx, {
  type: 'line',
  data: {
    labels: data.revenus.labels,
    datasets: [{
      label: 'Revenus (€)',
      data: data.revenus.values,
      borderColor: '#7c3aed',
      backgroundColor: gradient,
      borderWidth: 2.5,
      pointBackgroundColor: '#7c3aed',
      pointRadius: 4,
      pointHoverRadius: 6,
      fill: true,
      tension: 0.4
    }]
  },
  options: {
    responsive: true,
    plugins: {
      legend: { display: false },
      tooltip: {
        backgroundColor: '#1e1e35',
        borderColor: 'rgba(124,58,237,0.4)',
        borderWidth: 1,
        titleColor: '#a78bfa',
        bodyColor: '#e2e8f0',
        padding: 10,
        callbacks: {
          label: ctx => ' ' + ctx.parsed.y.toLocaleString('fr-FR') + ' €'
        }
      }
    },
    scales: {
      x: {
        grid: { color: 'rgba(255,255,255,0.04)' },
        ticks: { color: '#64748b', font: { size: 12 } }
      },
      y: {
        grid: { color: 'rgba(255,255,255,0.04)' },
        ticks: {
          color: '#64748b',
          font: { size: 12 },
          callback: v => v.toLocaleString('fr-FR') + ' €'
        }
      }
    }
  }
});

// ===== CHART CATÉGORIES =====
const categoriesCtx = document.getElementById('categoriesChart').getContext('2d');
new Chart(categoriesCtx, {
  type: 'doughnut',
  data: {
    labels: ['Électronique', 'Mode', 'Maison', 'Autre'],
    datasets: [{
      data: [38, 27, 22, 13],
      backgroundColor: ['#7c3aed', '#2563eb', '#10b981', '#f59e0b'],
      borderColor: '#16162a',
      borderWidth: 3,
      hoverOffset: 6
    }]
  },
  options: {
    responsive: true,
    cutout: '68%',
    plugins: {
      legend: { display: false },
      tooltip: {
        backgroundColor: '#1e1e35',
        borderColor: 'rgba(255,255,255,0.1)',
        borderWidth: 1,
        titleColor: '#e2e8f0',
        bodyColor: '#a78bfa',
        padding: 10,
        callbacks: {
          label: ctx => ' ' + ctx.parsed + '%'
        }
      }
    }
  }
});

// ===== SWITCH CHART =====
function switchChart(type, btn) {
  document.querySelectorAll('.tab').forEach(t => t.classList.remove('active'));
  btn.classList.add('active');

  const d = data[type];
  revenusChart.data.labels = d.labels;
  revenusChart.data.datasets[0].data = d.values;
  revenusChart.update();
}