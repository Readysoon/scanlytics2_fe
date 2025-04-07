import json from '@rollup/plugin-json'

// under the plugin line :
plugins: [
  replace({
    'process.env.SECRET_OPENAIKEY': JSON.stringify(process.env.SECRET_OPENAIKEY),
    preventAssignment: true,  // Required to avoid warnings
  }),
  json({
    compact: true
  })
]