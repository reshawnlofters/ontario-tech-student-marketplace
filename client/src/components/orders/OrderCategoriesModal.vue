<script setup>
import * as d3 from 'd3'
import { computed, onMounted, ref, watch } from 'vue'

const props = defineProps({
  order: {
    type: Object,
    required: true,
  },
})

const emit = defineEmits(['close'])
const orderCategoryChartContainer = ref(null)

const orderCategoryChartData = computed(() => {
  const orderCategoryCounts = {}

  props.order.items.forEach((item) => {
    const category = item.category

    if (!orderCategoryCounts[category]) {
      orderCategoryCounts[category] = 0
    }

    orderCategoryCounts[category] += item.quantity
  })

  return Object.entries(orderCategoryCounts).map(([category, count]) => ({
    category,
    count,
  }))
})

function renderOrderCategoryChart() {
  if (!orderCategoryChartContainer.value) return

  d3.select(orderCategoryChartContainer.value).selectAll('*').remove()

  const data = orderCategoryChartData.value
  if (data.length === 0) return

  const width = 600
  const height = 350
  const margin = { top: 30, right: 20, bottom: 60, left: 60 }
  const maxTickValue = d3.max(data, (d) => d.count)
  const tickValues = d3.range(0, maxTickValue + 1)

  const svg = d3
    .select(orderCategoryChartContainer.value)
    .append('svg')
    .attr('width', width)
    .attr('height', height)

  const x = d3
    .scaleBand()
    .domain(data.map((d) => d.category))
    .range([margin.left, width - margin.right])
    .padding(0.25)

  const y = d3
    .scaleLinear()
    .domain([0, d3.max(data, (d) => d.count)])
    .nice()
    .range([height - margin.bottom, margin.top])

  svg
    .selectAll('rect')
    .data(data)
    .enter()
    .append('rect')
    .attr('x', (d) => x(d.category))
    .attr('y', (d) => y(d.count))
    .attr('width', x.bandwidth())
    .attr('height', (d) => y(0) - y(d.count))
    .attr('fill', 'var(--otu-orange)')

  svg
    .append('g')
    .attr('transform', `translate(0, ${height - margin.bottom})`)
    .call(d3.axisBottom(x))

  svg
    .append('g')
    .attr('transform', `translate(${margin.left}, 0)`)
    .call(d3.axisLeft(y).tickValues(tickValues).tickFormat(d3.format('d')))

  svg
    .append('text')
    .attr('x', width / 2)
    .attr('y', height - 10)
    .attr('text-anchor', 'middle')
    .text('Category')

  svg
    .append('text')
    .attr('transform', 'rotate(-90)')
    .attr('x', -height / 2)
    .attr('y', 16)
    .attr('text-anchor', 'middle')
    .text('Number of Items')

  svg.selectAll('text').style('font-size', '1rem')
}

onMounted(() => {
  renderOrderCategoryChart()
})

watch(
  () => props.order,
  () => {
    renderOrderCategoryChart()
  },
  { deep: true },
)
</script>

<template>
  <div class="modal-order-categories-modal-overlay" @click.self="$emit('close')">
    <div class="order-categories-modal-content-container">
      <div class="order-categories-modal-header-container">
        <h2 class="order-categories-modal-title title is-4 mb-0">Order Categories</h2>
        <button class="close-order-categories-modal-button button is-light" @click="$emit('close')">
          Close
        </button>
      </div>

      <p class="order-id-label mb-4"><span>Order ID</span>: {{ order.id }}</p>

      <div ref="orderCategoryChartContainer"></div>
    </div>
  </div>
</template>

<style scoped>
.order-categories-modal-header-container {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 1rem;
}

.order-categories-modal-content-container {
  width: 650px;
  max-width: 90vw;
  padding: 2rem;
  background: white;
  border-radius: 1rem;
  box-shadow: 0 24px 48px rgb(0 0 0 / 25%);
}

.order-categories-modal-title {
  font-family: Ubuntu, Arial, Helvetica, sans-serif;
  color: var(--otu-blue);
}

.order-id-label {
  color: black;
}

.order-id-label span {
  font-weight: bold;
}

.close-order-categories-modal-button {
  background-color: var(--otu-light-grey);
}

.modal-order-categories-modal-overlay {
  position: fixed;
  inset: 0;
  z-index: 1000;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: rgb(0 0 0 / 25%);
}

@media screen and (width <= 750px) {
  .modal-order-categories-modal-overlay,
  .order-categories-modal-content-container {
    display: none;
  }
}
</style>
