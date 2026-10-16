Une application Angular qui permet aux étudiants de consulter le matériel de l'école et de le réserver. Un responsable peut gérer le catalogue (ajouter, modifier, supprimer).

La connexion est simulée (pas de mot de passe) et les données sont enregistrées dans le localStorage du navigateur.

## Lancer le projet

Il faut avoir **Node.js** installé (version 20 ou plus).

```bash

git clone https://github.com/Mohamed-kabore/campus-materiel.git
cd campus-materiel
npm install
npm start
Puis ouvrir **http://localhost:4200** dans le navigateur.
```

## Les comptes

Sur la page de connexion, on choisit un compte. Il n'y a pas de mot de passe.

| **Alice Martin** (Étudiante). Elle peut voir le catalogue, réserver, voir et annuler ses réservations
| **Yanis Bernard** (Étudiant) . Pareil qu'Alice (il ne voit pas les réservations d'Alice)  
| **Camille Dupont** (Responsable) . Il peut voir le catalogue, ajouter, modifier et supprimer du matériel

## Routes

/ : Redirige vers la connexion ou le catalogue Selon la session
/login : Choix du compte Public
/catalogue : Liste, recherche et filtre Connecté
/materiels/:id : Fiche détaillée et réservation Connecté (réservation : étudiant)
/mes-reservations : Mes réservations Étudiant
/gestion : Gestion du catalogue (chargée à la demande) Responsable
/gestion/nouveau : Ajouter un équipement Responsable
/gestion/:id/modifier : Modifier un équipement Responsable
/acces-refuse : Accès refusé Public
autre Page 404 Public

## Les pages

**Connexion** :Choisir un compte /tout le monde
**Catalogue** :Voir tout le matériel, chercher par nom ou catégorie
**Fiche matériel** :Voir le détail d'un équipement et le réserver  
**Mes réservations** :Voir et annuler ses réservations(Etudiant)
**Gestion** :Ajouter, modifier, supprimer du matériel (Responsable)

Si quelqu'un essaie d'ouvrir une page qui ne lui est pas destinée, il est renvoyé vers la connexion ou vers une page « Accès refusé ».

## Les règles

- Un équipement ne peut être réservé **que par une seule personne** à la fois.
- Seuls les **étudiants** peuvent réserver.
- Un étudiant ne peut annuler **que ses propres** réservations.
- On ne peut **pas supprimer** un équipement qui est réservé.
- Dans le formulaire, le nom (3 caractères minimum), la catégorie, la description (10 caractères minimum) et la localisation sont obligatoires.

---

## Comment le code est rangé

src/app/
data/ données de départ fournies
services/ session, catalogue, réservations, stockage
guards/ contrôle des accès
components/ carte d'équipement, formulaire
pages/ les pages de l'application

- Les **pages** affichent les informations.
- Les **services** gardent les données et vérifient les règles.
- Les **composants** sont des briques qu'on réutilise dans plusieurs pages.

## Accessibilité

- Tout le site s'utilise au **clavier**.
- Un lien « Aller au contenu » permet de sauter le menu.
- Les messages (confirmation, erreur) sont lus par les lecteurs d'écran.
- Le site s'adapte aux **téléphones**.

## Scénario de test

Avant de commencer : localStorage.clear() dans la console puis recharger.

Sans être connecté, ouvrir /mes-reservations : on arrive sur la connexion.

Se connecter avec Alice et réserver l'ordinateur portable 01 : il passe en "Réservé".

Aller dans "Mes réservations" : la réservation est là. Recharger la page : elle est toujours là.

Se connecter avec Yanis : "Mes réservations" est vide et il ne peut pas réserver l'ordinateur 01.

Se connecter avec Camille et modifier une fiche dans Gestion : la modification apparaît dans le catalogue.

Essayer de supprimer l'ordinateur 01 : la suppression est refusée car il est réservé.

Revenir avec Alice et annuler la réservation : l'ordinateur 01 redevient disponible.

Ouvrir /nimporte-quoi : page 404.

Ouvrir /materiels/999 : message "Équipement introuvable".

Avec Alice, ouvrir /gestion : page "Accès refusé".

Avec Camille, valider le formulaire d'ajout vide : les messages d'erreur s'affichent et la saisie est conservée.

Dans le catalogue, rechercher "xyz" : message "Aucun équipement ne correspond".

## Limites

La sécurité est seulement simulée côté navigateur. Dans une vraie application, les droits seraient vérifiés par un serveur.

Les données restent dans le navigateur utilisé, elles ne sont pas partagées entre plusieurs ordinateurs.

Si l'application est ouverte dans deux onglets, il faut recharger pour voir les changements faits dans l'autre.

Si on supprime l'équipement avec le plus grand id, le prochain équipement créé peut reprendre ce numéro.
