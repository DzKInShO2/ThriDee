<script lang="ts">
    import { categories } from "$lib/firebase";
</script>


<section class="Home">
    <div class="Home-overlay">
          <div class="Home-content">
              <!-- <h1 class="display-4 fw-bold">ThriDee</h1> -->
              <img src="/logo.png" alt="ThriDee" />
              <p class="lead mb-4">
                "Jelajahi koleksi aset 3D berkualitas tinggi yang dirancang untuk memperkaya proyek kreatif Anda dan membawa ide-ide Anda menjadi nyata."</p>
              <a href="/marketplace" class="btn">JELAJAHI SEKARANG</a>
          </div>
    </div>
</section>
 
<div class="flex flex-col items-center justify-between py-8">
    <div class="w-full md:w-4/5 px-4">
        <h1 class="text-3xl font-bold mb-4">ABOUT US</h1>
        <h2 class="text-lg">
            ThriDee adalah platform marketplace aset 3D yang bertujuan menjadi penghubung utama antara kreator, desainer, dan pengembang dalam menemukan, membeli, maupun menjual aset digital berkualitas tinggi. Dengan misi membangun ekosistem kreatif global, ThriDee menghadirkan fitur unggulan seperti upload & jual aset dengan mudah, kategori lengkap (karakter, kendaraan, lingkungan, alat bantu), wishlist, pencarian cerdas, ulasan, rating, serta panel admin dan notifikasi otomatis. Didirikan oleh tim muda yang antusias terhadap teknologi 3D dan komunitas kreatif digital, ThriDee hadir untuk mempercepat proses produksi visual dan memperkuat kolaborasi antar pelaku industri kreatif di seluruh dunia.
        </h2>

        <div class="about-section mt-8">
            <div class="image-section">
                <img src="/char.jpg" alt="awalan" />
            </div>
            <div class="text-section">
                <div class="content">
                <h1>Temukan Desain 3D Anda</h1>
                <p>
                    Mulailah petualangan kreatif Anda dengan menjelajahi berbagai koleksi desain 3D pilihan kami. Baik Anda seorang desainer game, arsitek, animator, atau kreator digital lainnya, kami menyediakan aset yang dapat membantu Anda mewujudkan ide menjadi kenyataan. Temukan aset yang paling sesuai dengan gaya dan kebutuhan proyek Anda, dan mulailah berkarya tanpa batas!
                </p>
                </div>
            </div>
        </div>

        <div class="about-section reverse">
            <div class="text-section">
                <div class="content">
                <h1>Eksplorasi Aset 3D</h1>
                <p>
                    Jelajahi dunia penuh kemungkinan dengan ribuan aset 3D yang siap digunakan untuk memperkaya proyek Anda. Dari karakter yang hidup, kendaraan futuristik, hingga lingkungan yang imersif – semua dapat Anda temukan di satu tempat. Nikmati pengalaman eksplorasi yang mudah dan menyenangkan, lengkap dengan fitur pencarian pintar, kategori terkurasi, dan ulasan pengguna. Temukan inspirasi dan tingkatkan kualitas karya Anda mulai dari sekarang!
                </p>
                </div>
            </div>
            <div class="image-section">
                <img src="/environment.png" alt="awalan" />
            </div>
        </div>
    </div>

    <div class="w-full px-4 md:px-20">
        <section style="padding: 2rem"></section>
        <h1>Start Exploring NOW</h1>
        <div class="grid-assets">
            {#each categories as asset}
                <a href="/search?c={asset.id}" class="card-hover">
                    <img src={asset.img} alt={asset.title} class="object-cover w-full h-full" />
                    <div class="absolute bg-[#FFFFFF10] text-white w-full bottom-0 p-2">
                        <p style="font-weight: bold; text-align: center;">{asset.title}</p>
                    </div>
                </a>
            {/each}
        </div>
    </div>
</div>

