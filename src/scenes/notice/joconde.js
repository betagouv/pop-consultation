import React from "react";
import { Row, Col, Container } from "reactstrap";
import LinkedNotices from "./components/LinkedNotices";
import Field from "./components/field";
import Loader from "../../components/loader";
import Title from "./components/title";
import API from "../../services/api";
import NotFound from "../../components/NotFound";
import Header from "./components/header";
import ContactUs from "./components/ContactUs";
// import "./index.css";

class Notice extends React.Component {
  state = {
    notice: null,
    error: "",
    loading: true,
    links: []
  };

  async componentWillMount() {
    console.log("hey", this.props);

  }

  render() {

    if (!this.props.notice) {
      return <NotFound />;
    }

    return (
      <Container className="notice" fluid>
        <Row className="top-section">
          <Col>
            <h1 className="heading">{this.props.notice.TICO}</h1>
          </Col>
        </Row>
        <Row>
          <Col sm="9">
            <Header
              notice={this.props.notice}
              externalImages={false}
              images={this.props.notice.IMG}
            />
            <Row>
              <Col sm="12">
                <div className="notice-details">
                  <Title
                    content="Identification du bien culturel"
                    notice={this.props.notice}
                    fields={[
                      "INV",
                      "DOMN",
                      "DENO",
                      "APPL",
                      "TITR",
                      "AUTR",
                      "PAUT",
                      "ECOL",
                      "ATTR",
                      "PERI",
                      "MILL",
                      "EPOQ",
                      "PEOC",
                      "TECH",
                      "DIMS",
                      "INSC",
                      "PINS",
                      "ONOM",
                      "DESC",
                      "ETAT",
                      "REPR",
                      "PREP",
                      "DREP",
                      "SREP"
                    ]}
                  />

                  <Field
                    title="N°Inventaire, ancien(s) numéros(s), autres numéros, N° de dépôt :"
                    content={this.props.notice.INV}
                  />
                  <Field
                    title="Domaine (catégorie du bien) :"
                    content={this.props.notice.DOMN}
                  />
                  <Field
                    title="Dénomination du bien : "
                    content={this.props.notice.DENO}
                  />
                  <Field
                    title="Appellation :"
                    content={this.props.notice.APPL}
                  />
                  <Field title="Titre :" content={this.props.notice.TITR} />
                  <Field
                    title="Auteur / exécutant / collecteur :"
                    content={this.props.notice.AUTR}
                  />
                  <Field
                    title="Précisions / auteur / exécutant / collecteur :"
                    content={this.props.notice.PAUT}
                  />
                  <Field title="Ecole :" content={this.props.notice.ECOL} />
                  <Field
                    title="Anciennes attributions :"
                    content={this.props.notice.ATTR}
                  />
                  <Field
                    title="Période de création / exécution :"
                    content={this.props.notice.PERI}
                  />
                  <Field
                    title="Millésime de création / exécution :"
                    content={this.props.notice.MILL}
                  />

                  <Field
                    title="Epoque / style / mouvement :"
                    content={this.props.notice.EPOQ}
                  />
                  <Field
                    title="Période de l’original copié :"
                    content={this.props.notice.PEOC}
                  />
                  <Field
                    title="Matériaux et techniques :"
                    content={this.props.notice.TECH}
                  />
                  <Field title="Mesures :" content={this.props.notice.DIMS} />
                  <Field
                    title="Inscriptions :"
                    content={this.props.notice.INSC}
                  />
                  <Field
                    title="Précisions sur les inscriptions :"
                    content={this.props.notice.PINS}
                  />
                  <Field
                    title="Onomastique :"
                    content={this.props.notice.ONOM}
                  />
                  <Field
                    title="Description :"
                    content={this.props.notice.DESC}
                  />
                  <Field
                    title="Etat du bien :"
                    content={this.props.notice.ETAT}
                  />
                  <Field
                    title="Sujet représenté :"
                    content={this.props.notice.REPR}
                    separator="#"
                  />
                  <Field
                    title="Précisions sur le sujet représenté :"
                    content={this.props.notice.PREP}
                  />
                  <Field
                    title="Date de la représentation :"
                    content={this.props.notice.DREP}
                  />
                  <Field
                    title="Source de la représentation :"
                    content={this.props.notice.SREP}
                  />
                  <Title
                    content="Contexte historique"
                    notice={this.props.notice}
                    fields={[
                      "GENE",
                      "HIST",
                      "LIEUX",
                      "PLIEUX",
                      "GEOHI",
                      "UTIL",
                      "PUTI",
                      "PERU",
                      "MILU",
                      "DECV",
                      "PDEC",
                      "NSDA"
                    ]}
                  />
                  <Field title="Genèse :" content={this.props.notice.GENE} />
                  <Field
                    title="Historique – Objets associés :"
                    content={this.props.notice.HIST}
                  />
                  <Field
                    title="Lieu de création / d’exécution / d’utilisation :"
                    content={this.props.notice.LIEUX}
                  />
                  <Field
                    title="Précisions sur le lieu de création / d’exécution / d’utilisation :"
                    content={this.props.notice.PLIEUX}
                  />
                  <Field
                    title="Géographie historique :"
                    content={this.props.notice.GEOHI}
                  />
                  <Field
                    title="Utilisation / Destination :"
                    content={this.props.notice.UTIL}
                  />
                  <Field
                    title="Précisions sur l’utilisation :"
                    content={this.props.notice.PUTI}
                  />
                  <Field
                    title="Période d’utilisation :"
                    content={this.props.notice.PERU}
                  />
                  <Field
                    title="Millésime d’utilisation :"
                    content={this.props.notice.MILU}
                  />
                  <Field
                    title="Découverte / collecte :"
                    content={this.props.notice.DECV}
                  />
                  <Field
                    title="Précisions sur la découverte / collecte / récolte :"
                    content={this.props.notice.PDEC}
                  />
                  <Field
                    title="Numéro de site :"
                    content={this.props.notice.NSDA}
                  />
                  <Title
                    content="Informations juridiques"
                    notice={this.props.notice}
                    fields={[
                      "STAT",
                      "DACQ",
                      "APTN",
                      "DEPO",
                      "DDPT",
                      "ADPT",
                      "LOCA"
                    ]}
                  />
                  <Field
                    title="Statut juridique :"
                    content={this.props.notice.STAT}
                  />
                  <Field
                    title="Date d’acquisition :"
                    content={this.props.notice.DACQ}
                  />
                  <Field
                    title="Ancienne appartenance :"
                    content={this.props.notice.APTN}
                  />
                  <Field
                    title="Dépôt / établissement dépositaire :"
                    content={this.props.notice.DEPO}
                  />
                  <Field
                    title="Date de dépôt / changement d’affectation :"
                    content={this.props.notice.DDPT}
                  />

                  <Field
                    title="Ancien dépôt / changement d’affectation :"
                    content={this.props.notice.ADPT}
                  />
                  <Field
                    title="Localisation :"
                    content={this.props.notice.LOCA}
                  />
                  <Title
                    content="Informations complémentaires"
                    notice={this.props.notice}
                    fields={["COMM", "EXPO", "BIBL"]}
                  />
                  <Field
                    title="Commentaires :"
                    content={this.props.notice.COMM}
                  />
                  <Field
                    title="Exposition :"
                    content={this.props.notice.EXPO}
                  />
                  <Field
                    title="Bibliographie :"
                    content={this.props.notice.BIBL}
                    separator="#"
                  />
                </div>
              </Col>
            </Row>
          </Col>
          <Col sm="3">
            <LinkedNotices links={this.state.links} />
            <div className="sidebar-section info">
              <h4>A propos de cette notice</h4>
              <hr />
              <div>
                <Field title="Référence : " content={this.props.notice.REF} />
                <Field
                  title="Date de création : "
                  content={this.props.notice.DMIS}
                />
                <Field
                  title="Dernière mise à jour : "
                  content={this.props.notice.DMAJ}
                />
                <Field
                  title="Crédits photographiques : "
                  content={this.props.notice.AUTP}
                />
                <Field
                  title="Auteur de l'oeuvre ou de l'original : "
                  content={this.props.notice.AUTOR}
                />
                <Field title="" content={this.props.notice.COPY} />
              </div>

              <ContactUs
                contact={this.props.notice.CONTACT}
                reference={this.props.notice.REF}
              />
            </div>

            <SeeMore notice={this.props.notice} />
          </Col>
        </Row>
      </Container>
    );
  }
}

const SeeMore = ({ notice }) => {
  const arr = [];

  if (notice.LVID) {
    arr.push(
      <Field title="Lien Vidéo :" content={notice.LVID} key={`notice.LVID`} />
    );
  }

  if (notice.WWW) {
    arr.push(
      <p className="field" key={`notice.WWW`}>
        Site complémentaire:
        <span style={{ width: "100%" }}>
          <a href={notice.WWW}>{notice.WWW}</a>
        </span>
      </p>
    );
  }

  if (notice.MUSEO) {
    arr.push(
      <p className="field" key={`notice.MUSEO`}>
        Lien vers la base MUSEOFILE :
        <span style={{ width: "100%" }}>
          <a
            href={`http://www2.culture.gouv.fr/public/mistral/museo_fr?ACTION=CHERCHER&FIELD_98=REF&VALUE_98=${
              notice.MUSEO
            }`}
            target="_blank"
          >
            {notice.MUSEO}
          </a>
        </span>
      </p>
    );
  }

  if (!arr.length) {
    return <div />;
  }

  return (
    <div className="sidebar-section info">
      <h4>Voir aussi</h4>
      <hr />
      <div>{arr}</div>
    </div>
  );
};

//http://www2.culture.gouv.fr/public/mistral/museo_fr?ACTION=CHERCHER&FIELD_98=REF&VALUE_98=M5027

export default Notice;
