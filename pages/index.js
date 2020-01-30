import React from "react";
import Link from "next/link";
import fetch from "isomorphic-unfetch";
import { request, GraphQLClient } from "graphql-request";
import Utils from "web3-utils";
function Index(props) {
  return (
    <div
      style={{
        height: "100vh",
        alignItems: "center",
        textAlign: "center",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        fontFamily: '-apple-system, system-ui, "Segoe UI", Roboto'
      }}
    >
      <h2 style={{ marginTop: 0 }}>
        <div style={{ fontWeight: "normal", marginBottom: 16 }}>
          Total Redeemed Tickets:
        </div>{" "}
        {props.totalTickets}
      </h2>
      <h2 style={{ marginBottom: 0 }}>
        <div style={{ fontWeight: "normal", marginBottom: 16 }}>
          Total Fees Earned:
        </div>{" "}
        {parseFloat(Utils.fromWei(props.totalFees))} ETH
      </h2>
    </div>
  );
}
Index.getInitialProps = async () => {
  const endpoint =
    "https://api.thegraph.com/subgraphs/name/adamsoffer/livepeer-tickets";
  const graphQLClient = new GraphQLClient(endpoint);
  const query = `
    {
      stats {
        totalFees
        totalTickets
      }
    }
  `;
  const data = await graphQLClient.request(query);
  const { totalFees, totalTickets } = data.stats[0];
  return { totalFees, totalTickets };
};

export default Index;
