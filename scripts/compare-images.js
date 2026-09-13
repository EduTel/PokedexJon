const { performance } = require('perf_hooks');
const crypto = require('crypto');

const POKEMON_IDS = Array.from({ length: 10 }, (_, i) => i + 1);

const GITHUB_RAW_BASE =
  'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/';
const JSDELIVR_CDN_BASE =
  'https://cdn.jsdelivr.net/gh/PokeAPI/sprites@master/sprites/pokemon/other/official-artwork/';

async function fetchImageInfo(url) {
  const start = performance.now();
  try {
    const res = await fetch(url, { headers: { 'User-Agent': 'Node-Benchmark' } });
    const buffer = await res.arrayBuffer();
    const duration = Math.round(performance.now() - start);
    const hash = crypto.createHash('sha256').update(Buffer.from(buffer)).digest('hex').slice(0, 8);

    return {
      status: res.status,
      size: buffer.byteLength,
      duration,
      hash,
      ok: res.ok,
    };
  } catch (error) {
    const duration = Math.round(performance.now() - start);
    return {
      status: 'ERR',
      size: 0,
      duration,
      hash: '------',
      ok: false,
      error: error.message,
    };
  }
}

async function runBenchmark() {
  console.log('='.repeat(86));
  console.log(' COMPARACIÓN: GitHub Raw vs jsDelivr CDN vs wsrv.nl (Primeros 10 Pokémon)');
  console.log('='.repeat(86));
  console.log(
    [
      'ID'.padEnd(4),
      'GitHub Raw'.padEnd(16),
      'jsDelivr CDN'.padEnd(16),
      'wsrv.nl WebP'.padEnd(18),
      'Ahorro Peso',
    ].join(' | ')
  );
  console.log('-'.repeat(86));

  let totalRawBytes = 0;
  let totalOptBytes = 0;

  for (const id of POKEMON_IDS) {
    const rawUrl = `${GITHUB_RAW_BASE}${id}.png`;
    const cdnUrl = `${JSDELIVR_CDN_BASE}${id}.png`;
    const optUrl = `https://wsrv.nl/?url=${encodeURIComponent(rawUrl)}&w=150&q=80&output=webp`;

    const [raw, cdn, opt] = await Promise.all([
      fetchImageInfo(rawUrl),
      fetchImageInfo(cdnUrl),
      fetchImageInfo(optUrl),
    ]);

    totalRawBytes += raw.size;
    totalOptBytes += opt.size;

    const savedPct = ((1 - opt.size / raw.size) * 100).toFixed(1);

    console.log(
      [
        `#${String(id).padStart(2, '0')}`.padEnd(4),
        `${(raw.size / 1024).toFixed(1)} KB (${raw.duration}ms)`.padEnd(16),
        `${(cdn.size / 1024).toFixed(1)} KB (${cdn.duration}ms)`.padEnd(16),
        `${(opt.size / 1024).toFixed(1)} KB (${opt.duration}ms)`.padEnd(18),
        `-${savedPct}%`,
      ].join(' | ')
    );
  }

  console.log('='.repeat(86));
  const totalSaved = ((1 - totalOptBytes / totalRawBytes) * 100).toFixed(1);
  console.log(`Peso total 10 imágenes (Original)  : ${(totalRawBytes / 1024).toFixed(1)} KB`);
  console.log(`Peso total 10 imágenes (Optimizado): ${(totalOptBytes / 1024).toFixed(1)} KB`);
  console.log(`Ahorro total de transferencia      : -${totalSaved}% menos peso`);
  console.log('='.repeat(86));
}

runBenchmark();
