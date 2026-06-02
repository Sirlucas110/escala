import prisma from "./prisma";

const ITEMS_PER_PAGE = 5;

export async function fetchTotalPaginasMembros(query: string) {
  try {
    const total = await prisma.membro.count({
      where: {
        OR: [
          { nome: { contains: query, mode: "insensitive" } },
          { email: { contains: query, mode: "insensitive" } },
        ],
      },
    });
    return Math.ceil(total / ITEMS_PER_PAGE);
  } catch {
    throw new Error("Falha ao contar membros.");
  }
}

export async function fetchMembros(query: string, currentPage: number) {
  const offset = (currentPage - 1) * ITEMS_PER_PAGE;

  try {
    const membros = await prisma.membro.findMany({
      where: {
        OR: [{ nome: { contains: query, mode: "insensitive" } }],
      },
      orderBy: { id: "desc" },
      take: ITEMS_PER_PAGE,
      skip: offset,
    });
    return membros;
  } catch (error) {
    console.error("Erro ao buscar membros");
    throw new Error("Falha ao buscar membros")
  }
}

export async function fetchMembroById(id: number) {
  try {
    const membro = await prisma.membro.findUnique({
      where: { id },
      select: {
        id: true,
        nome: true,
        email: true,
        perfil: true,
      },
    });
    return membro;
  } catch (error) {
    console.error("Erro no banco:", error);
    throw new Error("Falha ao buscar membro por id.");
  }
}

export async function fetchSetor(query: string, currentPage: number) {
  const offset = (currentPage - 1) * ITEMS_PER_PAGE;

  try {
    const setores = await prisma.setor.findMany({
      where: {
        OR: [
          { nome: { contains: query, mode: "insensitive" } },
          {
            diretor: {
              nome: { contains: query, mode: "insensitive" },
            },
          },
        ],
      },
      include: {
        diretor: {
          select: {
            nome: true,
            email: true,
          },
        },
      },
      skip: offset,
      take: ITEMS_PER_PAGE,
      orderBy: { id: "desc" },
    });
    return setores;
  } catch (error) {
    console.error("Erro no banco:", error);
    throw new Error("Falha ao buscar setores.");
  }
}


export async function fetchTotalPaginasSetores(query: string) {
  try {
    const total = await prisma.setor.count({
      where: {
        OR: [
          { nome: { contains: query, mode: "insensitive" } },
          {
            diretor: {
              nome: { contains: query, mode: "insensitive" },
            },
          },
        ],
      },
    });
    return Math.ceil(total / ITEMS_PER_PAGE);
  } catch {
    throw new Error("Falha ao contar setores.");
  }
}


export async function fetchMembrosPorSetor(setorId: number) {
  return prisma.membroSetor.findMany({
    where: { setorId },
    include: {
      membro: {
        select: { id: true, nome: true, email: true },
      },
    },
  });
}

export async function fetchMembrosDisponiveis(setorId: number) {
  // Busca membros que ainda NÃO estão no setor
  const jaVinculados = await prisma.membroSetor.findMany({
    where: { setorId },
    select: { membroId: true },
  });

  const idsVinculados = jaVinculados.map((m) => m.membroId);

  return prisma.membro.findMany({
    where: {
      id: { notIn: idsVinculados },
    },
    select: { id: true, nome: true },
  });
}
export async function fetchSetorById(id: number) {
  return prisma.setor.findUnique({
    where: { id },
    select: { id: true, nome: true },
  });
}

// Busca todos os setores com seus membros para montar a escala
export async function fetchSetoresComMembros() {
  return prisma.setor.findMany({
    include: {
      membros: {
        include: {
          membro: {
            select: { id: true, nome: true },
          },
        },
      },
    },
  });
}

// Busca todas as escalas para listagem
export async function fetchEscalas() {
  return prisma.escala.findMany({
    orderBy: { data: "desc" },
    include: {
      setor: { select: { nome: true } },
      itens: {
        include: {
          membro: { select: { nome: true } },
        },
      },
    },
  });
}