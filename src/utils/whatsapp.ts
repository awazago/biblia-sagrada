export function shareVerseOnWhatsApp(reference: string, text: string) {
  const currentUrl = window.location.origin;
  const message = `✨ *Palavra de Deus para o seu dia*\n\n"${text}"\n\n📖 *${reference} (NVI)*\n\n🕊️ Leia com explicação teológica e áudio:\n${currentUrl}`;
  const encoded = encodeURIComponent(message);
  window.open(`https://api.whatsapp.com/send?text=${encoded}`, '_blank');
}

export function shareDevotionalOnWhatsApp(
  title: string,
  reference: string,
  verseText: string,
  messageText: string,
  prayerText: string
) {
  const currentUrl = window.location.origin;
  const text = `☀️ *Meditação do Dia — ${title}*\n\n"${verseText}"\n📖 *${reference}*\n\n💡 *Reflexão:* ${messageText}\n\n🙏 *Oração:* ${prayerText}\n\n🕊️ *Bíblia Sagrada Online:* ${currentUrl}`;
  const encoded = encodeURIComponent(text);
  window.open(`https://api.whatsapp.com/send?text=${encoded}`, '_blank');
}
