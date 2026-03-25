export async function GET() {
  // Configure in your environment:
  // NEXT_PUBLIC_ADSENSE_PUBLISHER_ID=pub-xxxxxxxxxxxxxxxx
  const publisher = process.env.NEXT_PUBLIC_ADSENSE_PUBLISHER_ID;
  const signature = 'f08c47fec0942fa0'; // AdSense default signature

  if (!publisher) {
    return new Response(
      [
        '# AdSense ads.txt placeholder',
        '# Set NEXT_PUBLIC_ADSENSE_PUBLISHER_ID=pub-xxxxxxxxxxxxxxxx',
        '',
      ].join('\n'),
      { headers: { 'Content-Type': 'text/plain; charset=utf-8' } },
    );
  }

  const content = `google.com, ${publisher}, DIRECT, ${signature}\n`;
  return new Response(content, { headers: { 'Content-Type': 'text/plain; charset=utf-8' } });
}

