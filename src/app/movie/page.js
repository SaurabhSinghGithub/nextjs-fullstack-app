import Link from "next/link";
import MovieCard from "../components/MovieCard";
import styles from "@/app/styles/common.module.css"

const movie = async ({ searchParams }) => {
  await new Promise(resolve => setTimeout(resolve, 2000));

  // Pagination
  // const totalData = 50;
  // const totalData = 177;
  const totalData = 164;
  const dataPerPage = 8;
  const totalPages = Math.ceil(totalData / dataPerPage);
  let currentPage = 1;
  if (Number(searchParams.page) >= 1) {
    currentPage = Number(searchParams.page);
  }
  let offset = (currentPage - 1) * dataPerPage;



  const url = process.env.RAPID_KEY;


  const options = {
    method: 'GET',
    headers: {
      'X-RapidAPI-Key': '7a4461ae4dmsh46431595eb2546fp15c568jsn856a1bc6139e',
      'X-RapidAPI-Host': 'netflix54.p.rapidapi.com'
    }
  };

  const res = await fetch(`https://netflix54.p.rapidapi.com/search/?query=stranger&offset=${offset}&limit_titles=${dataPerPage}&limit_suggestions=20&lang=en`, options);

  // const res = await fetch(url, options);
  const data = await res.json();
  const main_data = data.titles;


  //pagination
  let PageNumbers = [];
  for (let i = currentPage - 3; i <= currentPage + 3; i++) {
    if (i < 1) continue;
    if (i > totalPages) break;
    PageNumbers.push(i);
  }

  return (
    <>
      <section className={styles.movieSection}>
        <div className={styles.container}>
          <h1>Series & Movie</h1>
          <div className={styles.card_section}>
            {
              main_data.map((curElem) => {
                return <MovieCard key={curElem.id} {...curElem} />
              })
            }
          </div>
        </div>

        {/* pagination */}
        <div className={styles.container} style={{ display: "flex", gap: "2rem", justifyContent: "center" }}>
          {currentPage - 1 >= 1 && (
            <>
              <Link href={`/movie?page=${currentPage - 1}`}>{"Previous"}</Link>
            </>
          )
          }
          {
            PageNumbers.map((page) => {
              return <Link className={page === currentPage ? styles.activeLink : ""} key={page} href={`/movie?page=${page}`}>{page}</Link>
            })
          }
          {currentPage + 1 <= totalPages && (
            <>
              <Link href={`/movie?page=${currentPage + 1}`}>{"Next"}</Link>
            </>
          )
          }
        </div>
      </section>
    </>
  )
}

export default movie;