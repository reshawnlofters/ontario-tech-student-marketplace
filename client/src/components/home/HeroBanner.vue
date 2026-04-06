<script setup>
import { onMounted, onBeforeUnmount } from 'vue'
import { useRouter } from 'vue-router'
import $ from 'jquery'

const router = useRouter()

let intervalId = null

function navigateToItemListings() {
  const listingsSection = document.getElementById('marketplace-listings')
  if (listingsSection) {
    listingsSection.scrollIntoView({ behavior: 'smooth' })
  }
}

function navigateToListItem() {
  router.push('/list-item')
}

onMounted(() => {
  const promoMessages = [
    'Use code OTSM10 at checkout for 10% off your order',
    "Browse this week's latest student listings",
    'List your unused items and earn some extra cash',
  ]

  let index = 0

  function showNextMessage() {
    const el = $('#promo-text')

    el.fadeOut(400, () => {
      index = (index + 1) % promoMessages.length
      el.text(promoMessages[index]).fadeIn(400)
    })
  }

  intervalId = setInterval(showNextMessage, 3000)

  // Pause on hover
  $('.promo-pill').hover(
    () => clearInterval(intervalId),
    () => {
      intervalId = setInterval(showNextMessage, 3000)
    },
  )
})

onBeforeUnmount(() => {
  if (intervalId) clearInterval(intervalId)
})
</script>

<template>
  <section class="hero-banner box mb-6">
    <div class="columns is-vcentered is-variable is-6">
      <div class="column is-7">
        <p class="hero-tag">Ontario Tech Student Marketplace</p>

        <h1 class="title is-2 hero-title">
          Buy and sell used student items at a
          <span>fraction of the cost</span>.
        </h1>

        <p class="subtitle is-5 hero-subtitle">
          OTSM is your one-stop shop for buying and selling used Ontario Tech student items,
          including clothing, accessories, school supplies, and more.
        </p>

        <!-- Rotating promo messages using JQuery -->
        <div class="promo-pill mb-4">
          <span id="promo-text">Use code OTSM10 at checkout for 10% off your order</span>
        </div>

        <div class="buttons">
          <button
            class="browse-listings-button button is-primary is-medium"
            @click="navigateToItemListings"
          >
            Browse Listings
          </button>

          <button class="list-an-item-button button is-light is-medium" @click="navigateToListItem">
            List an Item
          </button>
        </div>
      </div>

      <!-- Item cards -->
      <div class="column is-5">
        <div class="hero-visual">
          <div class="hero-card hero-card-top">
            <span class="tag is-info is-light">Great Condition</span>
            <p class="hero-card-title">Nike Water Bottle</p>
            <p class="hero-card-price">$10.00</p>
          </div>

          <div class="hero-card hero-card-middle">
            <span class="tag is-success is-light">Like New</span>
            <p class="hero-card-title">Ontario Tech Hoodie</p>
            <p class="hero-card-price">$35.00</p>
          </div>

          <div class="hero-card hero-card-bottom">
            <span class="tag is-warning is-light">Good Condition</span>
            <p class="hero-card-title">16-inch Summer Tires</p>
            <p class="hero-card-price">$90.00</p>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.hero-banner {
  background: linear-gradient(135deg, #0b2e4f 0%, #123f6b 55%, #1b5e91 100%);
  color: white;
  border-radius: 20px;
  overflow: hidden;
  position: relative;
  padding: 2.5rem;
}

.hero-tag {
  font-size: 0.85rem;
  font-weight: 700;
  color: #a9d8f5;
  text-transform: uppercase;
  letter-spacing: 0.08em;
  margin-bottom: 1rem;
}

.hero-title,
.hero-subtitle {
  color: white;
}

.hero-title {
  margin-bottom: 1rem !important;
}

.hero-title span {
  color: var(--ontario-tech-orange);
}

.hero-subtitle {
  font-size: 16px;
}

.promo-pill {
  display: inline-block;
  background-color: rgba(255, 255, 255, 0.14);
  border: 1px solid rgba(255, 255, 255, 0.18);
  border-radius: 100px;
  padding: 0.7rem 1rem;
  margin-bottom: 24px !important;
}

#promo-text {
  display: inline-block;
  transition: opacity 0.3s ease;
}

.browse-listings-button,
.list-an-item-button {
  font-size: 18px;
  font-weight: bold;
  border-radius: 6px;
  padding: 12px 18px;
}

.browse-listings-button {
  background-color: var(--ontario-tech-orange);
  color: white;
}

.list-an-item-button {
  background-color: white;
  color: var(--ontario-tech-blue);
}

.hero-visual {
  position: relative;
  min-height: 280px;
}

.hero-card {
  position: absolute;
  width: 220px;
  background: white;
  color: #1f2937;
  border-radius: 18px;
  padding: 1rem;
  box-shadow: 0 16px 32px rgba(0, 0, 0, 0.25);
}

.hero-card-title {
  font-weight: 700;
  color: var(--ontario-tech-dark-blue);
  margin-top: 0.75rem;
}

.hero-card-price {
  font-weight: 800;
}

.hero-card-top {
  top: 0;
  right: 40px;
}

.hero-card-middle {
  top: 100px;
  left: 0px;
}

.hero-card-bottom {
  top: 170px;
  right: 0px;
}
</style>
