import styled from "styled-components";
import { BsBookmarkStar, BsBookmarkStarFill } from "react-icons/bs";
import { useParams } from "react-router-dom";
import {
  useFetchRecipe,
  useAddWish,
  useDeleteWish,
} from "../hooks/useFetchRecipe";
import { useQueryClient } from "react-query";

export default function DetailPage() {
  const { category, id } = useParams();
  const queryClient = useQueryClient();
  const { data } = useFetchRecipe(category || "", id || "");
  const separator = new RegExp(`${"\n|\\\\n"}`);
  const rcpType = category === "regular" ? "REGULAR_RECIPE" : "CUSTOM_RECIPE";
  const propsData = { type: rcpType, recipeId: id };
  const deleteWishMutation = useDeleteWish(propsData);
  const addWishMutation = useAddWish(propsData);
  const widhClickHandle = async () => {
    if (data?.data.wishList) {
      await deleteWishMutation.mutateAsync();
      queryClient.invalidateQueries("recipe");
    } else {
      await addWishMutation.mutateAsync();
      queryClient.invalidateQueries("recipe");
    }
  };

  return (
    <Container>
      <InfoWrapper>
        <PhotoArea src={data?.data.imageUrl} />
        <DetailArea>
          <TitleArea>
            <TitleTab>{data?.data.name}</TitleTab>
            <Bookmarker onClick={widhClickHandle}>
              {data?.data.wishList && (
                <BsBookmarkStarFill size="30" color="#96A5FF" />
              )}
              {!data?.data.wishList && (
                <BsBookmarkStar size="30" color="#96A5FF" />
              )}
            </Bookmarker>
          </TitleArea>
          <TitleExplanation>{data?.data.description}</TitleExplanation>
          <IngredientTab>재료</IngredientTab>
          <Ingredient>
            {data?.data.ingredient.split(separator).map((el, i) => (
              <IngredientItems key={i}>{el}</IngredientItems>
            ))}
          </Ingredient>
          <RecipeTab>RECIPE</RecipeTab>
          <Recipe>
            {data?.data.recipe.split(separator).map((el, i) => (
              <RecipeItems key={i}>{el}</RecipeItems>
            ))}
          </Recipe>
        </DetailArea>
      </InfoWrapper>
    </Container>
  );
}

const IngredientTab = styled.div`
  margin-bottom: 20px;
  font-size: 25px;
  font-weight: bold;
`;

const RecipeTab = styled.div`
  margin-bottom: 20px;
  font-size: 25px;
  font-weight: bold;
`;

const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;

  height: 100%;
  margin-top: 7rem;
`;

const InfoWrapper = styled.div`
  box-sizing: border-box;
  display: flex;
  justify-content: center;
  align-items: center;
  box-shadow: 0px -1px 4px rgba(0, 0, 0, 0.25);
  width: 80%;
  height: 100%;
  padding: 4rem;
  border-radius: 20px 20px 0 0;
  border-top: 1px solid gray;
  border-left: 1px solid gray;
  border-right: 1px solid gray;
`;

const PhotoArea = styled.img`
  max-width: 500px;
  min-height: 600px;
  height: 100%;
  border-radius: 3%;
  justify-self: start;
  align-self: start;
`;

const DetailArea = styled.div`
  display: flex;
  flex-direction: column;
  margin-left: 7rem;
  width: 470px;
  min-height: 665px;
  padding: 0 20px 20px;
  border-radius: 3%;
`;

const TitleArea = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 20px;
`;

const TitleTab = styled.div`
  font-size: 25px;
  font-weight: bold;
`;

const Bookmarker = styled.div`
  margin-left: 1rem;
  cursor: pointer;
`;

const TitleExplanation = styled.div`
  font-size: 17px;
  margin-bottom: 40px;
  margin-left: 10px;
  line-height: 2;
`;

const Ingredient = styled.ul`
  width: 100%;
  margin-bottom: 20px;
`;

const IngredientItems = styled.li`
  margin-bottom: 20px;
  margin-left: 10px;
  font-size: 17px;
`;

const Recipe = styled.ol`
  width: 100%;
`;

const RecipeItems = styled.li`
  font-size: 17px;
  margin-bottom: 5px;
  margin-left: 10px;
  line-height: 2;
`;
