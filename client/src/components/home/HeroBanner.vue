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
    const el = $('#promo-message-text')

    el.fadeOut(400, () => {
      index = (index + 1) % promoMessages.length
      el.text(promoMessages[index]).fadeIn(400)
    })
  }

  intervalId = setInterval(showNextMessage, 5000)

  // Pause rotation on hover
  $('.promo-message-tag').hover(
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

        <h1 class="page-title title is-2 hero-title">
          Buy and sell used student items at a
          <span>fraction of the cost</span>.
        </h1>

        <p class="subtitle is-5 hero-subtitle">
          OTSM is your one-stop shop for buying and selling used Ontario Tech student items,
          including clothing, accessories, school supplies, and more.
        </p>

        <!-- Rotating promo messages -->
        <div class="promo-message-tag mb-4">
          <span id="promo-message-text">Use code OTSM10 at checkout for 10% off your order</span>
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
  position: relative;
  padding: 2.5rem;
  overflow: hidden;
  color: white;
  background: linear-gradient(135deg, #0b2e4f 0%, #123f6b 55%, #1b5e91 100%);
  border-radius: 0.75rem;
}

.hero-banner .page-title {
  color: white !important;
}

.hero-tag {
  margin-bottom: 1rem;
  font-size: 0.85rem;
  font-weight: 700;
  color: #a9d8f5;
  text-transform: uppercase;
  letter-spacing: 0.08em;
}

.hero-title,
.hero-subtitle {
  color: white;
}

.hero-title {
  margin-bottom: 1rem !important;
}

.hero-title span {
  color: var(--otu-orange);
}

.hero-subtitle {
  font-size: 1rem;
}

.promo-message-tag {
  display: inline-block;
  padding: 0.75rem 1.125rem;
  margin-bottom: 1.5rem !important;
  background-color: rgb(255 255 255 / 14%);
  border: 1px solid rgb(255 255 255 / 18%);
  border-radius: 1.125rem;
}

#promo-message-text {
  display: inline-block;
  transition: opacity 0.3s ease;
}

.browse-listings-button,
.list-an-item-button {
  padding: 0.75rem 1.125rem;
  font-size: 1.125rem;
  font-weight: bold;
}

.browse-listings-button {
  color: white;
  background-color: var(--otu-orange);
}

.list-an-item-button {
  color: var(--otu-blue);
  background-color: white;
}

.hero-visual {
  position: relative;
  min-height: 280px;
}

.hero-card {
  position: absolute;
  width: 220px;
  padding: 1rem;
  color: #1f2937;
  background: white;
  border-radius: 1rem;
  box-shadow: 0 16px 32px rgb(0 0 0 / 25%);
}

.hero-card-title {
  margin-top: 0.75rem;
  font-weight: 700;
  color: var(--otu-dark-blue);
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
  left: 0;
}

.hero-card-bottom {
  top: 170px;
  right: 0;
}
</style>
