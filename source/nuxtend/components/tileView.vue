<template>
  <div class="visual-map-wrap">
    <div id="div_inner" class="inner">
      <div id="svg-container" class="svg-container"></div>
      <div id="div_tooltip" class="toolTip"></div>
    </div>
  </div>
</template>

<script>
import data from '~/pages/portal/ui/board/information/data.json'
const d3 = require('d3')
export default {
  name: "tileView",
  mounted() {
    function setTileView(data){
      const divInner = document.querySelector('#div_inner')

      // // padding 사이즈 고려 (-2)
      const width = divInner.offsetWidth - 2
      const height = divInner.offsetHeight - 2

      // 숫자 형식 포맷
      const format = d3.format(',d')

      // 가로 가중치
      const wWeight = width / 1000
      // 세로 가중치
      const hWeight = height / 1000

      // 작은 폰트나 생략된 폰트 표시용 툴팁
      const toolTip = d3.select('#div_tooltip')

      const colorArr = [
        '#0084b5',
        '#5460dc',
        '#009ee4',
        '#cf8c16',
        '#4480df',
        '#1cb86f',
        '#029174',
        '#00a2a8',
        '#dc67ab',
        '#dc6967',
      ]

      // 타일뷰 색깔 리스트
      const color = d3.scaleOrdinal(colorArr)

      const colorArr01 = d3
        .scaleOrdinal()
        .range([
          '#0084b5',
          '#008dc2',
          '#0195cc',
          '#12a2d8',
          '#20ace1',
          '#57c7f1',
          '#57c7f1',
          '#57c7f1',
          '#57c7f1',
          '#57c7f1',
        ])

      const colorArr02 = d3
        .scaleOrdinal()
        .range([
          '#5460dc',
          '#5c69eb',
          '#6976f3',
          '#7a85f9',
          '#8792ff',
          '#a5aeff',
          '#a5aeff',
          '#a5aeff',
          '#a5aeff',
          '#a5aeff',
        ])

      const colorArr03 = d3
        .scaleOrdinal()
        .range([
          '#0080cb',
          '#0888d2',
          '#0b8dd8',
          '#1898e2',
          '#24a3ec',
          '#5ec4fe',
          '#5ec4fe',
          '#5ec4fe',
          '#5ec4fe',
          '#5ec4fe',
        ])

      const colorArr04 = d3
        .scaleOrdinal()
        .range([
          '#cf8c16',
          '#db9925',
          '#e2a63e',
          '#e9af4a',
          '#f2bb5b',
          '#fbce80',
          '#fbce80',
          '#fbce80',
          '#fbce80',
          '#fbce80',
        ])

      const colorArr05 = d3
        .scaleOrdinal()
        .range([
          '#2969cf',
          '#3a7adf',
          '#4480df',
          '#548eeb',
          '#669ef6',
          '#88b6ff',
          '#88b6ff',
          '#88b6ff',
          '#88b6ff',
          '#88b6ff',
        ])

      const colorArr06 = d3
        .scaleOrdinal()
        .range([
          '#00a759',
          '#00b460',
          '#1dbc72',
          '#16cc77',
          '#39d28b',
          '#66e9ac',
          '#66e9ac',
          '#66e9ac',
          '#66e9ac',
          '#66e9ac',
        ])

      const colorArr07 = d3
        .scaleOrdinal()
        .range([
          '#029174',
          '#039f80',
          '#00aa87',
          '#00b48f',
          '#01c29b',
          '#53d9be',
          '#53d9be',
          '#53d9be',
          '#53d9be',
          '#53d9be',
        ])

      const colorArr08 = d3
        .scaleOrdinal()
        .range([
          '#00a2a8',
          '#02a9af',
          '#03b2b8',
          '#1dbcc2',
          '#00c2c8',
          '#2ed0d5',
          '#2ed0d5',
          '#2ed0d5',
          '#2ed0d5',
          '#2ed0d5',
        ])

      const colorArr09 = d3
        .scaleOrdinal()
        .range([
          '#c9378c',
          '#de4da1',
          '#dc67ab',
          '#e877b8',
          '#f283c3',
          '#ff98d4',
          '#ff98d4',
          '#ff98d4',
          '#ff98d4',
          '#ff98d4',
        ])

      const colorArr10 = d3
        .scaleOrdinal()
        .range([
          '#d15654',
          '#d96260',
          '#df5b59',
          '#dc6967',
          '#e9807e',
          '#fba1a0',
          '#fba1a0',
          '#fba1a0',
          '#fba1a0',
          '#fba1a0',
        ])

      const colorArrList = (index) => [
        colorArr01(index),
        colorArr02(index),
        colorArr03(index),
        colorArr04(index),
        colorArr05(index),
        colorArr06(index),
        colorArr07(index),
        colorArr08(index),
        colorArr09(index),
        colorArr10(index),
      ]

      // 최상단 데이터 노드
      const root = d3
        .hierarchy(data)
        .sum((d) => d.value)
        .sort((a, b) => b.value - a.value)

      // svg 셀렉션
      const svg = d3
        .select('#svg-container')
        .append('svg')
        .attr('id', 'treemap_area')
        .attr('width', '100%')
        .attr('height', '100%')
        .attr('style', 'cursor:pointer;')

      // 타일뷰 정의
      d3.treemap().size([width, height]).padding(1)(root)

      let dataIndex = 0

      svg
        .selectAll('rect')
        .data(root.children)
        .enter()
        .append('g')
        .append('rect')
        .attr('data-name', (d) => d.data.name)
        .attr('data-value', (d) => d.data.value)
        .attr('x', (d) => d.x0)
        .attr('y', (d) => d.y0)
        .attr('width', (d) => d.x1 - d.x0)
        .attr('height', (d) => d.y1 - d.y0)
        .style('fill', (d) => {
          const colorIndex = dataIndex < 10 ? dataIndex : 9
          if (data.color != null) {
            const colorArrNum = colorArr.indexOf(data.color)
            const fillColor = colorArrList(colorIndex)[colorArrNum]
            dataIndex++
            return fillColor
          }
          d.color = color(d.data.name)
          return d.color
        })
        .each(function (d) {
          const bbox = this.getBBox()
          // this.parentNode.parentNode는 svg component를 의미한다.
          const cbbox = this.parentNode.parentNode.getBBox()
          // 가로 비율
          d.wScale = (bbox.width / cbbox.width) * 100
          // 세로 비율
          d.hScale = (bbox.height / cbbox.height) * 100
          // 기준 비율 (가로 세로 중 더 작은 비율로 폰트 사이즈 결정)
          d.stdScale = d.wScale > d.hScale ? d.hScale : d.wScale
          // 기준 가중치
          d.stdWeight = d.wScale > d.hScale ? hWeight : wWeight
        })
        .on('mousemove', (event, d) => {
          if (d.data.tooltip === 1) {
            toolTip.style('left', event.layerX + 'px')
            toolTip.style('top', event.layerY + 'px')
            toolTip.style('display', 'inline-block')
            toolTip.html(
              '&nbsp&nbsp' +
              `${d.data.name}(${Math.round((d.value / root.value) * 100)}%)` +
              '<br>' +
              `${format(d.value)}건`
            )
          }
        })
        .on('mouseout', () => toolTip.style('display', 'none'))
        .on('click', (event, d) => {
          toolTip.style('display', 'none')
          const currentData = data.children.filter(
            (item) => item.name === d.data.name
          )
          currentData[0].color = d.color
          d3.select('#treemap_area').remove()
          setTileView(currentData[0])
        })

      const tat = svg
        .selectAll('g')
        .append('text')
        .attr('x', (d) => d.x0 + (d.x1 - d.x0) / 2)
        .attr('y', (d) => d.y0 + (d.y1 - d.y0) / 2)
        .attr('dominant-baseline', 'middle')
        .attr('text-anchor', 'middle')
        .style('text-align', 'center')
        .attr('fill', 'white')
        .on('mousemove', function (event, d) {
          if (d.data.tooltip === 1) {
            toolTip.style('left', event.layerX + 'px')
            toolTip.style('top', event.layerY + 'px')
            toolTip.style('display', 'inline-block')
          }
        })
        .on('mouseout', () => toolTip.style('display', 'none'))
        .on('click', (event, d) => {
          toolTip.style('display', 'none')
          const currentData = data.children.filter(
            (item) => item.name === d.data.name
          )
          currentData[0].color = d.color
          d3.select('#treemap_area').remove()
          setTileView(currentData[0])
        })

      tat
        .append('tspan')
        .style('font-size', (d) => {
          // 텍스트 사이즈
          const fontSize = d.stdScale * d.stdWeight
          if (fontSize < 16) d.data.tooltip = 1
          return fontSize + 'px'
        })
        .attr('x', (d) => d.x0 + (d.x1 - d.x0) / 2)
        .attr('y', (d) => d.y0 + (d.y1 - d.y0) / 2 - (d.stdScale * d.stdWeight) / 2)
        .text(function (d) {
          let returnval = d.data.name
          // 데이터 이름 (%표시)
          if (d.data.name != null && d.data.name !== '') {
            // 각 rect의 폭
            const rectWidth = width * (d.wScale / 100)
            // 텍스트 사이즈
            const fontSize = d.stdScale * d.stdWeight
            // 텍스트 최대 길이
            const textLengthLimit = rectWidth / fontSize + 2
            // data name이 텍스트 최대 길이보다 길때
            if (d.data.name.length > textLengthLimit) {
              d.data.tooltip = 1
              returnval = d.data.name.substr(0, textLengthLimit) + '...'
            }

            // 데이터 퍼센트
            const dataPercent = Math.round((d.value / root.value) * 100)
            returnval += '(' + dataPercent + '%)'
          }

          return returnval
        })
      tat
        .append('tspan')
        .style('font-size', function (d) {
          // 텍스트 사이즈
          const fontSize = d.stdScale * d.stdWeight
          if (fontSize < 16) d.data.tooltip = 1
          return fontSize + 'px'
        })
        .attr('x', (d) => d.x0 + (d.x1 - d.x0) / 2)
        .attr('y', (d) => d.y0 + (d.y1 - d.y0) / 2 + (d.stdScale * d.stdWeight) / 2)
        .text(function (d) {
          let returnval = ''
          if (d.data.name != null && d.data.name !== '') {
            returnval = format(d.value) + '건'
          }
          return returnval
        })
    }
    setTileView(data)
  }
}
</script>

<style scoped>
.visual-map-wrap {
  width: 100%;
  height: 800px;
  padding: 20px 0;
  background: #f5f7fa;
}
.visual-map-wrap > .inner {
  position: relative;
  width: 1000px;
  height: 100%;
  margin: 0 auto;
  border: 1px solid #cecece;
  border-radius: 5px;
}
.toolTip {
  position: absolute;
  display: none;
  width: auto;
  height: auto;
  background: none repeat scroll 0 0 white;
  border: 0 none;
  border-radius: 8px 8px 8px 8px;
  box-shadow: -3px 3px 15px #888888;
  color: black;
  font: 16px sans-serif;
  padding: 5px;
  text-align: center;
  z-index: 1;
  white-space: nowrap;
}
.svg-container {
  height: 100%;
}
</style>

