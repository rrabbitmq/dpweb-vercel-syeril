// Mengambil & menampilkan Daftar Film secara asinkron dari data/film.json
async function muatDaftarFilm() {
    const tbody = document.querySelector(".table-responsive table tbody");
    const loading = document.getElementById("loading-indicator");
    if (!tbody) return;

    loading.style.display = "block";
    tbody.innerHTML = "";

    try {
        // simulasi delay jaringan agar loading indicator terlihat
        await new Promise((resolve) => setTimeout(resolve, 600));

        const res = await fetch("../data/film.json");
        if (!res.ok) {
            throw new Error("Gagal mengambil data (status " + res.status + ")");
        }
        const daftarFilm = await res.json();

        daftarFilm.forEach(function (film) {
            const tr = document.createElement("tr");
            tr.innerHTML =
                "<td>" + film.judul + "</td>" +
                "<td>" + film.pengarang + "</td>" +
                "<td>" + film.tahun + "</td>" +
                "<td>" + film.stok + "</td>" +
                "<td>" +
                "<button type=\"button\">Edit</button> " +
                "<button type=\"button\" class=\"btn-hapus\">Hapus</button>" +
                "</td>";
            tbody.appendChild(tr);
        });
    } catch (err) {
        tbody.innerHTML =
            "<tr><td colspan=\"5\">Gagal memuat data: " + err.message + "</td></tr>";
    } finally {
        loading.style.display = "none";
    }
}

document.addEventListener("DOMContentLoaded", muatDaftarFilm);
