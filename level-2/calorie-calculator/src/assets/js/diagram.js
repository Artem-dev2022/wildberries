// источник https://www.cat-in-web.ru/svg-pie-chart/
function createPie(container, chartData, config = {}) {
    const svgns = "http://www.w3.org/2000/svg";
    const offsetRatio = {
      top: 0.25,
      right: 0,
      left: 0.5,
      bottom: -0.25,
    }
  
    const strokeWidth = config.strokeWidth || 5;
    const radiusValue = config.radius || 100;
    const radius = radiusValue - strokeWidth / 2;
    const fullSize = 2 * radiusValue;
  
    // длина окружности 
    const length = 2 * Math.PI * radius; 
  
    // смещение начальной точки
    let startPoint = config.start in offsetRatio ? config.start : 'top';
    const chartOffset = length * offsetRatio[startPoint];
  
    // расчетные данные для построения секторов
    const sectors = [];
    chartData.forEach((sectorData, sectorIndex) => {
      // Длина сектора
      const width = length * sectorData.value / 100;
      // Смещение сектора от начальной точки
      let offset = chartOffset;
  
      if (sectorIndex > 0) {
        let prevSector = sectors[sectorIndex - 1];
        offset = prevSector.offset - prevSector.width;
      }
  
      sectors.push({
        ...sectorData,
        width,
        offset,
      })
    });
  
    const svg = createSvgElement('svg', {
      'viewBox': `0 0 ${fullSize} ${fullSize}`,
      'fill': 'none',
      'width': fullSize,
      'height': fullSize,
    });
  
    sectors.forEach(sector => {
      const circle = createSvgElement('circle', {
        cx: radius + strokeWidth / 2,
        cy: radius + strokeWidth / 2,
        r: radius,
        'stroke-dasharray': `${sector.width} ${length - sector.width}`,
        'stroke-dashoffset': sector.offset,
        'stroke': sector.color,
        'stroke-width': strokeWidth
      })
  
      svg.appendChild(circle);
    })
  
    container.appendChild(svg);
  
    function createSvgElement(elementName, attrs = {}) {
      const el = document.createElementNS(svgns, elementName);
      Object.entries(attrs).forEach(([attrName, attrValue]) => {
        el.setAttributeNS(null, attrName, attrValue)
      });
      return el;
    }
  }
  
  
  // разделение на сектора (в процентах)
  const data = [
    {
      value: 30,
      color: 'red'
    },
    {
      value: 20,
      color: 'blue'
    },
    {
      value: 15,
      color: 'orange'
    },
    {
      value: 20,
      color: 'green'
    },
    {
      value: 5,
      color: 'black'
    },
    {
      value: 10,
      color: 'brown'
    }
  ];
  
  /* createPie(document.getElementById('diagram'), data, {
    strokeWidth: 100,
    radius: 100,
    start: 'top' // top|left|right|bottom
  }); */