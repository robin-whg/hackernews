import {
  defineConfig,
  presetIcons,
  presetTypography,
  presetUno,
  presetWebFonts,
} from 'unocss'

export default defineConfig({
  presets: [
    presetUno(),
    presetTypography(),
    presetIcons({
      scale: 1.25,
      extraProperties: {
        'display': 'inline-block',
        'vertical-align': 'sub',
      },
    }),
    presetWebFonts({
      provider: 'bunny',
      fonts: {
        sans: {
          name: 'Ubuntu',
          weights: ['300', '400', '500', '600', '700'],
        },
      },
    }),
  ],
})
