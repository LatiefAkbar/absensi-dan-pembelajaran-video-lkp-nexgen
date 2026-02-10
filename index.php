<button id="downloadBtn" class="download-button">
  Download Video Latihan
</button>

<script>
document.getElementById("downloadBtn").addEventListener("click", () => {
  const driveUrl = "https://drive.google.com/uc?export=download&id=1yvTIbLP_DOnIn5VNafTHf3E6FcxuF0aC";
  
  // buat iframe hidden supaya tetap di halaman
  const iframe = document.createElement("iframe");
  iframe.style.display = "none";
  iframe.src = driveUrl;
  document.body.appendChild(iframe);

  // tampilkan animasi download sementara
  alert("Download dimulai! ✨");
});
</script>

<style>
.download-button {
  padding: 10px 25px;
  background: linear-gradient(to right, #facc15, #eab308);
  color: #111827;
  font-weight: bold;
  border-radius: 10px;
  border: none;
  cursor: pointer;
  transition: all 0.2s;
}
.download-button:hover {
  opacity: 0.85;
  transform: scale(1.05);
}
</style>
