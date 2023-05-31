import type { GetServerSideProps } from "next";

//Layout
import Layout from "@/Layout";

//Components
import PageHeader from "@/Components/Common/PageHeader";
import Add from "@/Components/Academics/Section/Add";
import ListsHeader from "@/Components/Academics/Section/ListsHeader";
import Lists from "@/Components/Academics/Section/Lists";

//Apollo
import { initializeApollo, addApolloState } from "@/Apollo/client";
import { GET_SECTION_LIST } from "@/Apollo/Query/Academics/section.query";

const Section = () => {
    return (
        <Layout main="academics" sub="section">
            <PageHeader
                title="academics"
                navs={["Dashboard", "Academics", "Section"]}
            />
            <Add />
            <ListsHeader />
            <Lists />
        </Layout>
    );
};


export default Section;

export const getServerSideProps: GetServerSideProps = async (ctx) => {
    const apolloClient = initializeApollo()
    const { data } = await apolloClient.query({
        query: GET_SECTION_LIST,
        variables: { searchInput: {} },
        context: {
            headers: {
                cookie: ctx.req.headers.cookie,
                "user-agent": ctx.req.headers["user-agent"],
                "x-forwarded-for": ctx.req.socket.remoteAddress
            }
        }
    });
    return addApolloState(apolloClient, {
        props: {},
    })
}