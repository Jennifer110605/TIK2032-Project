// Wait for DOM to fully load
document.addEventListener('DOMContentLoaded', function() {
    // Set active navigation link based on current page
    setActiveNavLink();
    
    // Initialize dark mode toggle
    initDarkModeToggle();
    
    // Initialize page-specific functions (dengan perbaikan)
    try {
        initPageSpecificFunctions();
    } catch (error) {
        console.log('Error in page-specific functions:', error);
    }
    
    // Add fade-in animation to main container (dengan pengecekan)
    const container = document.querySelector('.container');
    if (container) {
        container.classList.add('fade-in');
    }
});

// Set active navigation link based on current URL
function setActiveNavLink() {
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    const navLinks = document.querySelectorAll('.nav-links a');
    
    navLinks.forEach(link => {
        const linkHref = link.getAttribute('href');
        if (linkHref === currentPage) {
            link.classList.add('active');
        }
    });
}

// Initialize dark mode toggle
function initDarkModeToggle() {
    // Create toggle button if it doesn't exist
    if (!document.querySelector('.mode-toggle')) {
        const toggleBtn = document.createElement('button');
        toggleBtn.className = 'mode-toggle';
        toggleBtn.innerHTML = '🌙';
        toggleBtn.title = 'Toggle Dark/Light Mode';
        document.body.appendChild(toggleBtn);
        
        // Check if dark mode is enabled in localStorage
        const isDarkMode = localStorage.getItem('darkMode') === 'true';
        if (isDarkMode) {
            document.body.classList.add('dark-mode');
            toggleBtn.innerHTML = '☀️';
        }
        
        // Add click event listener to toggle button
        toggleBtn.addEventListener('click', function() {
            document.body.classList.toggle('dark-mode');
            const isDark = document.body.classList.contains('dark-mode');
            localStorage.setItem('darkMode', isDark);
            toggleBtn.innerHTML = isDark ? '☀️' : '🌙';
        });
    }
}

// Initialize page-specific functions based on current page
function initPageSpecificFunctions() {
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    
    switch(currentPage) {
        case 'index.html':
            try { initHomePage(); } catch(e) { console.log('Error initializing home page:', e); }
            break;
        case 'gallery.html':
            try { initGalleryPage(); } catch(e) { console.log('Error initializing gallery page:', e); }
            break;
        case 'blog.html':
            try { initBlogPage(); } catch(e) { console.log('Error initializing blog page:', e); }
            break;
        case 'contact.html':
            try { initContactPage(); } catch(e) { console.log('Error initializing contact page:', e); }
            break;
    }
}

// Home page specific functions
function initHomePage() {
    // Add typing animation to welcome heading
    const welcomeHeading = document.querySelector('h1');
    if (welcomeHeading) {
        const text = welcomeHeading.textContent;
        welcomeHeading.textContent = '';
        let i = 0;
        
        function typeWriter() {
            if (i < text.length) {
                welcomeHeading.textContent += text.charAt(i);
                i++;
                setTimeout(typeWriter, 50);
            }
        }
        
        typeWriter();
    }
}

// Gallery page specific functions
function initGalleryPage() {
    // Add image preview functionality
    const gallerySection = document.querySelector('section');
    if (!gallerySection) return; // Hentikan jika tidak ada section
    
    const images = gallerySection.querySelectorAll('img');
    if (!images || images.length === 0) return; // Hentikan jika tidak ada gambar
    
    // Convert regular gallery to interactive gallery
    gallerySection.className = 'gallery-container';
    
    images.forEach(img => {
        // Create gallery item wrapper
        const galleryItem = document.createElement('div');
        galleryItem.className = 'gallery-item';
        
        // Clone the image
        const imgClone = img.cloneNode(true);
        imgClone.style.width = '100%';
        
        // Replace the original image with the gallery item
        galleryItem.appendChild(imgClone);
        img.replaceWith(galleryItem);
        
        // Add click event for lightbox effect
        galleryItem.addEventListener('click', function() {
            openLightbox(imgClone.src, imgClone.alt);
        });
    });
}

// Create and open lightbox
function openLightbox(imgSrc, imgAlt) {
    // Create lightbox elements
    const lightbox = document.createElement('div');
    lightbox.className = 'lightbox';
    lightbox.style.position = 'fixed';
    lightbox.style.top = '0';
    lightbox.style.left = '0';
    lightbox.style.width = '100%';
    lightbox.style.height = '100%';
    lightbox.style.backgroundColor = 'rgba(0, 0, 0, 0.9)';
    lightbox.style.display = 'flex';
    lightbox.style.justifyContent = 'center';
    lightbox.style.alignItems = 'center';
    lightbox.style.zIndex = '1000';
    
    // Create image element
    const img = document.createElement('img');
    img.src = imgSrc;
    img.alt = imgAlt;
    img.style.maxWidth = '90%';
    img.style.maxHeight = '90%';
    img.style.border = '2px solid white';
    
    // Create close button
    const closeBtn = document.createElement('span');
    closeBtn.textContent = '×';
    closeBtn.style.position = 'absolute';
    closeBtn.style.top = '20px';
    closeBtn.style.right = '30px';
    closeBtn.style.fontSize = '40px';
    closeBtn.style.color = 'white';
    closeBtn.style.cursor = 'pointer';
    
    // Add elements to lightbox
    lightbox.appendChild(img);
    lightbox.appendChild(closeBtn);
    
    // Add lightbox to body
    document.body.appendChild(lightbox);
    
    // Close lightbox when clicking on close button or outside the image
    closeBtn.addEventListener('click', function() {
        document.body.removeChild(lightbox);
    });
    
    lightbox.addEventListener('click', function(e) {
        if (e.target === lightbox) {
            document.body.removeChild(lightbox);
        }
    });
}

// Blog page specific functions
function initBlogPage() {
    // Add read more functionality to blog posts
    const blogPosts = document.querySelectorAll('h3 + p');
    if (!blogPosts || blogPosts.length === 0) return; // Hentikan jika tidak ada postingan blog
    
    blogPosts.forEach(post => {
        // Pastikan post dan elemen sekitarnya ada
        if (!post || !post.previousElementSibling) return;
        
        // Wrap each blog post in a container
        const postContainer = document.createElement('div');
        postContainer.className = 'blog-post';
        
        // Get the title (h3 element)
        const title = post.previousElementSibling;
        
        // Create blog meta element
        const blogMeta = document.createElement('div');
        blogMeta.className = 'blog-meta';
        blogMeta.textContent = `Posted on ${getRandomDate()} · ${Math.floor(Math.random() * 10) + 1} min read`;
        
        // Limit the content to 150 characters
        const fullContent = post.innerHTML;
        const limitedContent = fullContent.substring(0, 150).trim() + '...';
        post.innerHTML = limitedContent;
        post.className = 'blog-content';
        
        // Create read more link
        const readMoreLink = document.createElement('a');
        readMoreLink.href = 'javascript:void(0)';
        readMoreLink.className = 'read-more';
        readMoreLink.textContent = 'Read More';
        
        let isExpanded = false;
        readMoreLink.addEventListener('click', function() {
            if (isExpanded) {
                post.innerHTML = limitedContent;
                readMoreLink.textContent = 'Read More';
            } else {
                post.innerHTML = fullContent;
                readMoreLink.textContent = 'Show Less';
            }
            isExpanded = !isExpanded;
        });
        
        // Rearrange elements
        if (post.parentNode) {
            post.parentNode.insertBefore(postContainer, title);
            postContainer.appendChild(title);
            postContainer.appendChild(blogMeta);
            postContainer.appendChild(post);
            postContainer.appendChild(readMoreLink);
        }
    });
}

// Contact page specific functions
function initContactPage() {
    // Mencari container konten
    const contactHeading = document.querySelector('h1');
    if (!contactHeading || !contactHeading.textContent.includes("Contact")) {
        console.log("Contact heading not found, skipping contact page initialization");
        return;
    }
    
    const contactSection = contactHeading.parentNode;
    if (!contactSection) {
        console.log("Contact section not found, skipping contact page initialization");
        return;
    }
    
    // Dapatkan semua elemen yang ada di halaman kontak
    const existingElements = contactSection.querySelectorAll('*');
    console.log("Existing elements in contact page:", existingElements.length);
    
    // Cek apakah form kontak sudah ada
    const existingForm = contactSection.querySelector('.contact-form');
    if (existingForm) {
        console.log("Contact form already exists, skipping creation");
        return;
    }
    
    // Cek apakah info kontak sudah ada dalam format yang diharapkan
    const existingContactInfo = contactSection.querySelector('.contact-info');
    if (!existingContactInfo) {
        // Buat contact info container
        const contactInfo = document.createElement('div');
        contactInfo.className = 'contact-info';
        
        // Ambil detail kontak yang ada jika memungkinkan
        const existingDetails = Array.from(contactSection.querySelectorAll('b')).filter(item => {
            return item.textContent && item.textContent !== '2025 Jennifer Manoppo';
        });
        
        if (existingDetails.length > 0) {
            // Gunakan detail yang ada
            existingDetails.forEach(item => {
                if (item.parentNode) {
                    const contactItem = document.createElement('div');
                    contactItem.className = 'contact-item';
                    
                    // Tentukan emoji berdasarkan label
                    let emoji = '📌';
                    if (item.textContent.includes('Phone')) emoji = '📞';
                    if (item.textContent.includes('Instagram')) emoji = '📷';
                    if (item.textContent.includes('Email')) emoji = '✉️';
                    
                    // Simpan konten asli
                    const originalContent = item.parentNode.innerHTML;
                    
                    // Tambahkan ke item kontak
                    contactItem.innerHTML = `${emoji} ${originalContent}`;
                    contactInfo.appendChild(contactItem);
                }
            });
        } else {
            // Buat item kontak default
            contactInfo.innerHTML = `
                <div class="contact-item">
                    📞 <b>Phone:</b> +62 812-3456-7890
                </div>
                <div class="contact-item">
                    📷 <b>Instagram:</b> <a href="https://instagram.com/yourusername" target="_blank">@jennajahya_</a>
                </div>
                <div class="contact-item">
                    ✉️ <b>Email:</b> <a href="mailto:jennifermanoppo026@student.unsrat.ac.id">jennifermanoppo026@student.unsrat.ac.id</a>
                </div>
            `;
        }
        
        // Sisipkan info kontak setelah heading
        contactHeading.after(contactInfo);
    }
    
    // Buat form kontak
    const contactForm = document.createElement('div');
    contactForm.className = 'contact-form';
    contactForm.innerHTML = `
        <h3>Send Me a Message</h3>
        <form id="contactForm">
            <div class="form-group">
                <label for="name">Your Name</label>
                <input type="text" id="name" class="form-control" required>
            </div>
            <div class="form-group">
                <label for="email">Your Email</label>
                <input type="email" id="email" class="form-control" required>
            </div>
            <div class="form-group">
                <label for="subject">Subject</label>
                <input type="text" id="subject" class="form-control" required>
            </div>
            <div class="form-group">
                <label for="message">Message</label>
                <textarea id="message" class="form-control" required></textarea>
            </div>
            <button type="submit" class="submit-button">Send Message</button>
        </form>
    `;
    
    // Tambahkan form ke halaman
    const existingInfo = contactSection.querySelector('.contact-info');
    if (existingInfo) {
        existingInfo.after(contactForm);
    } else {
        contactHeading.after(contactForm);
    }
    
    // Tambahkan event listener untuk form
    const form = document.getElementById('contactForm');
    if (form) {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            const name = document.getElementById('name').value;
            alert(`Terima kasih, ${name}! Pesan Anda telah diterima.`);
            this.reset();
        });
    }
}

// Helper function to get random date for blog posts
function getRandomDate() {
    const start = new Date(2025, 0, 1);
    const end = new Date();
    const randomDate = new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
    return randomDate.toLocaleDateString('id-ID', { year: 'numeric', month: 'long', day: 'numeric' });
}
// Fungsi tambahan untuk penyesuaian mobile
document.addEventListener('DOMContentLoaded', function() {
    // Fungsi yang sudah ada ...
    
    // Deteksi apakah perangkat mobile
    const isMobile = window.innerWidth <= 768;
    
    // Penyesuaian animasi untuk mobile
    if(isMobile) {
        // Kurangi delay animasi typing untuk mobile
        const welcomeHeading = document.querySelector('.welcome-heading');
        if(welcomeHeading) {
            const text = welcomeHeading.textContent;
            welcomeHeading.textContent = '';
            let i = 0;
            
            // Typing lebih cepat untuk mobile
            function typeWriter() {
                if (i < text.length) {
                    welcomeHeading.textContent += text.charAt(i);
                    i++;
                    setTimeout(typeWriter, 30); // Lebih cepat
                }
            }
            
            // Delay memulai typing
            setTimeout(typeWriter, 500);
        }
        
        // Perbaiki ukuran lightbox untuk mobile
        const lightboxOpenFn = openLightbox;
        window.openLightbox = function(imgSrc, imgAlt) {
            // Panggil fungsi asli
            lightboxOpenFn(imgSrc, imgAlt);
            
            // Tambahkan pengaturan lebih untuk mobile
            const lightbox = document.querySelector('.lightbox');
            if(lightbox) {
                const img = lightbox.querySelector('img');
                if(img) {
                    img.style.maxWidth = '95%';
                    img.style.maxHeight = '80%';
                }
                
                // Tombol close lebih besar
                const closeBtn = lightbox.querySelector('span');
                if(closeBtn) {
                    closeBtn.style.fontSize = '50px';
                    closeBtn.style.top = '15px';
                    closeBtn.style.right = '15px';
                }
            }
        };
        
        // Mengatasi masalah tap focus pada mobile
        document.querySelectorAll('a, button').forEach(el => {
            el.addEventListener('touchstart', function(){
                // Hanya untuk efek visual pada touch
                this.classList.add('touch-active');
            });
            
            el.addEventListener('touchend', function(){
                this.classList.remove('touch-active');
            });
        });
    }
    
    // Tambahkan kelas khusus pada body untuk deteksi mobile via CSS
    if(isMobile) {
        document.body.classList.add('is-mobile');
    }
    
    // Perbaiki penanganan form contact di mobile
    const contactForm = document.getElementById('contactForm') || document.getElementById('contact-form');
    if(contactForm) {
        const inputs = contactForm.querySelectorAll('input, textarea');
        
        // Tambahkan handling untuk input focus di mobile
        inputs.forEach(input => {
            input.addEventListener('focus', function() {
                // Scroll ke elemen ketika difokuskan
                if(isMobile) {
                    setTimeout(() => {
                        this.scrollIntoView({
                            behavior: 'smooth',
                            block: 'center'
                        });
                    }, 300);
                }
            });
        });
    }
    
    // Cek ukuran image dan lakukan lazy loading untuk mobile
    const images = document.querySelectorAll('img');
    if(isMobile && images.length > 0) {
        images.forEach(img => {
            // Tambahkan lazy loading untuk performa
            img.loading = 'lazy';
            
            // Pastikan gambar memiliki alt text
            if(!img.alt) img.alt = 'Image';
        });
    }
});

// Tambahkan event resize untuk menangani perubahan orientasi layar
window.addEventListener('resize', function() {
    const isMobile = window.innerWidth <= 768;
    
    if(isMobile) {
        document.body.classList.add('is-mobile');
    } else {
        document.body.classList.remove('is-mobile');
    }
    
    // Recalculate gallery layout
    const galleryContainer = document.querySelector('.gallery-container');
    if(galleryContainer) {
        const items = galleryContainer.querySelectorAll('.gallery-item');
        if(items.length > 0) {
            // Force reflow untuk layout yang lebih baik
            galleryContainer.style.display = 'none';
            setTimeout(() => {
                galleryContainer.style.display = '';
            }, 10);
        }
    }
});

// Perbaikan untuk scroll dan interaksi sentuh di mobile
if('ontouchstart' in window) {
    document.documentElement.classList.add('touchscreen');
    
    // Perbaiki scrolling untuk iOS
    document.addEventListener('touchmove', function(e) {
        // Biarkan browser menangani semua touch event secara default
    }, { passive: true });
}
// Tambahkan fungsi ini ke bagian bawah scripts.js untuk memperbaiki animasi typing di mobile

// Fungsi perbaikan animasi typing pada perangkat mobile
function fixMobileTypingAnimation() {
    // Cek apakah ini halaman home
    const welcomeHeading = document.querySelector('.welcome-heading');
    if (!welcomeHeading) return;
    
    // Cek apakah tampilan mobile
    const isMobile = window.innerWidth <= 768;
    
    if (isMobile) {
        // Override fungsi typing yang mungkin sudah ada
        // Dapatkan teks asli
        const originalText = 'Selamat Datang di Personal Homepage Jennifer Manoppo';
        welcomeHeading.textContent = '';
        
        // Fungsi typing yang lebih cepat dan aman untuk mobile
        let i = 0;
        function mobileTypeWriter() {
            if (i < originalText.length) {
                welcomeHeading.textContent += originalText.charAt(i);
                i++;
                // Lebih cepat di mobile (20ms vs 50ms di desktop)
                setTimeout(mobileTypeWriter, 20);
            }
        }
        
        // Mulai animasi typing dengan sedikit delay
        setTimeout(() => {
            mobileTypeWriter();
        }, 500);
    }
}

// Tambahkan ke event DOMContentLoaded
document.addEventListener('DOMContentLoaded', function() {
    // Panggil fungsi lain yang sudah ada...
    
    // Tambahkan perbaikan animasi typing untuk mobile
    fixMobileTypingAnimation();
});

// Juga tangani event resize untuk kasus rotasi layar
window.addEventListener('resize', function() {
    // Cek jika ukuran layar berubah dari desktop ke mobile atau sebaliknya
    const wasMobile = window.wasMobile;
    const isMobile = window.innerWidth <= 768;
    window.wasMobile = isMobile;
    
    // Jika berubah dari desktop ke mobile atau sebaliknya, refresh halaman
    if (wasMobile !== undefined && wasMobile !== isMobile) {
        // Hanya refresh jika ini adalah halaman home
        if (document.querySelector('.welcome-heading')) {
            location.reload();
        }
    }
});
