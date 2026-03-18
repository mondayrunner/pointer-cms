export default defineEventHandler((event) => {
  deleteCookie(event, 'pointer-cms-token')
  deleteCookie(event, 'pointer-cms-repo')
  return { ok: true }
})
