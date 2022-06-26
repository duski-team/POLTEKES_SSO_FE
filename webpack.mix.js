mix.js('resources/assets/js/app.js', 'public/js').vue({
    options: {
      compilerOptions: {
        isCustomElement: (tag) => ['BNI'].includes(tag),
      },
    },
  });