import { CategoriesCarousel } from '../../components/CategoriesCarousel';
import { OffersCarousel } from '../../components/OffersCarousel';
import { Banner, Container } from './styles';

export function Home() {
  return (
    <main>
      <Banner>
        <h1>Seja Bem-Vindoa!</h1>
      </Banner>

      <Container>
        <div>
          <CategoriesCarousel />
          <OffersCarousel />
        </div>
      </Container>
    </main>
  );
}
