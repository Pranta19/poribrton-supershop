<script>
document.addEventListener('DOMContentLoaded', () => {
    const bannerContainer = document.getElementById('banner-container');
    const reviewCarousel = document.getElementById('review-carousel');
    const contactForm = document.getElementById('contact-form');
    const contactMessageFeedback = document.getElementById('contact-message-feedback');
    let currentBannerIndex = 0;
    let currentReviewIndex = 0;

    // Add your MOCK_BANNERS and MOCK_REVIEWS arrays here
    const MOCK_BANNERS = [
        { img: 'banner1.webp', title: 'বাংলার রং', desc: 'ঐতিহ্যবাহী পণ্য' },
        { img: 'banner2.webp', title: 'বাংলার গন্ধ', desc: 'প্রাকৃতিক পণ্য' }
    ];

    const MOCK_REVIEWS = [
        { name: 'রাহিম', review: 'চমৎকার পণ্য!', rating: 5 },
        { name: 'করিম', review: 'খুবই ভালো সেবা', rating: 4 }
    ];

    function initializeApp() {
        loadBanners();
        loadReviews();
        contactForm.addEventListener('submit', handleContactForm);
    }

    function loadBanners() {
        bannerContainer.innerHTML = '';
        MOCK_BANNERS.forEach((banner, index) => {
            const bannerEl = document.createElement('div');
            bannerEl.className = 'absolute top-0 left-0 w-full h-full transition-opacity duration-700';
            bannerEl.style.opacity = index === 0 ? '1' : '0';
            bannerEl.innerHTML = `
                <img src="${banner.img}" class="w-full h-full object-cover rounded-lg">
                <div class="absolute bottom-10 left-10 text-white">
                    <h2 class="text-3xl font-bold">${banner.title}</h2>
                    <p>${banner.desc}</p>
                </div>
            `;
            bannerContainer.appendChild(bannerEl);
        });
    }

    function showNextBanner() {
        const banners = Array.from(bannerContainer.children);
        banners[currentBannerIndex].style.opacity = '0';
        currentBannerIndex = (currentBannerIndex + 1) % banners.length;
        banners[currentBannerIndex].style.opacity = '1';
    }

    function showPrevBanner() {
        const banners = Array.from(bannerContainer.children);
        banners[currentBannerIndex].style.opacity = '0';
        currentBannerIndex = (currentBannerIndex - 1 + banners.length) % banners.length;
        banners[currentBannerIndex].style.opacity = '1';
    }

    function loadReviews() {
        reviewCarousel.innerHTML = '';
        MOCK_REVIEWS.forEach((review, index) => {
            const reviewDiv = document.createElement('div');
            reviewDiv.className = 'review-card flex-shrink-0 w-full md:w-1/2 lg:w-1/3 p-4';
            reviewDiv.style.display = index === 0 ? 'block' : 'none';
            reviewDiv.innerHTML = `
                <div class="bg-zinc-900 p-6 rounded-lg shadow-md h-full border-t-4 border-amber-500">
                    <p class="text-stone-300 mb-4 italic">"${review.review}"</p>
                    <p class="font-bold text-amber-400 text-right">- ${review.name}</p>
                    <p class="text-amber-500 text-right">${'★'.repeat(review.rating)}${'☆'.repeat(5 - review.rating)}</p>
                </div>
            `;
            reviewCarousel.appendChild(reviewDiv);
        });
    }

    function showNextReview() {
        const reviews = Array.from(reviewCarousel.children);
        reviews[currentReviewIndex].style.display = 'none';
        currentReviewIndex = (currentReviewIndex + 1) % reviews.length;
        reviews[currentReviewIndex].style.display = 'block';
    }

    function showPrevReview() {
        const reviews = Array.from(reviewCarousel.children);
        reviews[currentReviewIndex].style.display = 'none';
        currentReviewIndex = (currentReviewIndex - 1 + reviews.length) % reviews.length;
        reviews[currentReviewIndex].style.display = 'block';
    }

    function handleContactForm(e) {
        e.preventDefault();
        const name = document.getElementById('contact-name').value;
        const email = document.getElementById('contact-email').value;

        if (name && email) {
            showFeedbackMessage('Inquiry received. A specialist will respond to your request shortly.', 'success', contactMessageFeedback);
            contactForm.reset();
        }
    }

    function showFeedbackMessage(message, type = 'success', element) {
        element.textContent = message;
        element.classList.remove('hidden', 'text-green-600', 'text-red-600');

        if (type === 'success') element.classList.add('text-green-600');
        else element.classList.add('text-red-600');

        setTimeout(() => {
            element.classList.add('hidden');
        }, 5000);
    }

    initializeApp();
});
</script>
