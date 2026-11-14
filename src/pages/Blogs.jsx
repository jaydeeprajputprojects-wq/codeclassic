import { useParams } from 'react-router-dom'

function Blogs() {
  const { category } = useParams()
  const categoryName = category
    ?.split('-')
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ')
  const title = categoryName ? `${categoryName} Blogs` : 'Blogs'

  return (
    <section className="placeholder-card" aria-labelledby="page-title">
      <h1 id="page-title">{title}</h1>
      <p>The blog listing and category pages will be built in Session 4.</p>
    </section>
  )
}

export default Blogs
