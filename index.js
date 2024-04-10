// task 1
// trim() - убирает строки вначале и конце
// split() - делит строки на подстроки и переводит в массив
// map() - берет старый массив и на его основе новый вместо фор
// переводим в удобный вид
const normalizeData = (content) => {
  const [, ...data] = content.split('\n');
  data.pop();
  return data.map((item) => item.split(';'));
};

const getRatings = (data) => {
  const ratingsGP = data.map((item) => Number(item[2]));
  const ratingsAS = data.map((item) => Number(item[3]));

  const ratingGP = Math.max(...data.map((item) => Number(item[2])));

  const ratingAppStore = Math.max(...data.map((item) => Number(item[3])));

  const topMes = data[ratingsGP.indexOf(ratingGP)][0];
  const owner = data[ratingsAS.indexOf(ratingAppStore)][1];
  return [topMes, owner];
};

const getDlIndia = (data) => {
  const maxDlIndia = Math.max(...data.map((item) => Number(item[6])));
  const minDlIndia = Math.min(...data.map((item) => Number(item[6])));
  return [maxDlIndia, minDlIndia];
};

const getPopAust = (data) => {
  const sortDlAustr = data.map((item) => Number(item[5])).sort((a, b) => b - a);
  const downloadAust = data.map((item) => Number(item[5]));
  const sortedTop3 = [
    data[downloadAust.indexOf(sortDlAustr[0])][0],
    data[downloadAust.indexOf(sortDlAustr[1])][0],
    data[downloadAust.indexOf(sortDlAustr[2])][0],
  ];
  return sortedTop3.sort();
};

const numberOfDownload = (data) => {
  const averNumberOfDl = data.reduce((acc, item) => {
    const count = (Number(item[4]) + Number(item[5]) + Number(item[6]) + Number(item[7])) / 4;
    acc.push(count);
    return acc;
  }, []);
  const averNumberName = averNumberOfDl.reduce((acc, item) => {
    const nameApp = data[averNumberOfDl.indexOf(item)][0];
    acc.push([item, nameApp]);
    return acc;
  }, []);
  averNumberOfDl.sort((a, b) => a - b);
  const namesAverDl = averNumberOfDl.reduce((acc, item) => {
    const nameApp = averNumberName.filter((num) => num[0] === item);
    acc.push(nameApp[0][1]);
    return acc;
  }, []);
  return namesAverDl.join(', ');
};

const topOwner = (data) => {
  const owners = data.reduce((acc, item) => {
    const owner = item[1];
    if (!Object.hasOwn(acc, owner)) {
      acc[owner] = 0;
    }
    acc[owner] += 1;
    return acc;
  }, {});

  const ownersFilt = Object.entries(owners).filter((item) => item[1] >= 2);
  const topOwners = ownersFilt.map((item) => item[0]).join(', ');
  return topOwners;
};

const tableParsing = (content) => {
  const data = normalizeData(content);

  // step 1
  const [topMes, owner] = getRatings(data);
  console.log(`General top messenger: ${topMes}, Owner: ${owner}`);

  // step 2
  const [maxDlIndia, minDlIndia] = getDlIndia(data);
  console.log(`Download count: Max count: ${maxDlIndia}, Min count: ${minDlIndia}`);

  // step 3
  const [top1, top2, top3] = getPopAust(data);
  console.log(`Top-3 Australia: ${top1}, ${top2}, ${top3}`);

  // step 4
  const names = numberOfDownload(data);
  console.log(`Top downloads: ${names}`);

  // step 5
  const owners = topOwner(data);
  console.log(`Top owner: ${owners}`);
};

// task 2
const candidateAssessment = (/* content */) => {

};

// task 3
const actorRating = (/* content */) => {

};

export { tableParsing, candidateAssessment, actorRating };
