const modules = import.meta.glob('../pages/*/index.jsx')

const components = Object.entries(modules).map(([k, v]) => {
  const p = k.split('/')[1]
  return {
    k,
    link: `/${p}`,
    name: p,
    dynamicComp: v
  }
})

export default components
